import { inject, injectable } from 'inversify';
import { msg, str } from '@lit/localize';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { TYPES } from '@state/types';
import { Feature, PurchaseEvent, PurchaseType } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import { binarySearchDecimal, moveElementInArray } from '@shared/helpers';
import { PROGRAM_TEXTS } from '@texts/programs';
import { IMainframeProgramsState, IMainframeProgramsSerializedState } from './interfaces';
import { MAINFRAME_PROGRAMS_STATE_UI_EVENTS } from './constants';
import { ProgramName } from '../progam-factory/types';
import { IMakeProgramParameters, IProgram } from '../progam-factory/interfaces';

const { lazyInject } = decorators;

@injectable()
export class MainframeProgramsState implements IMainframeProgramsState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  private _stateUiConnector: IStateUIConnector;
  private _globalState: IGlobalState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private _programsList: IProgram[];
  private _ownedPrograms: Map<ProgramName, IProgram>;

  constructor(
    @inject(TYPES.StateUIConnector) _stateUiConnector: IStateUIConnector,
    @inject(TYPES.GlobalState) _globalState: IGlobalState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.Formatter) _formatter: IFormatter,
  ) {
    this._stateUiConnector = _stateUiConnector;
    this._globalState = _globalState;
    this._messageLogState = _messageLogState;
    this._formatter = _formatter;

    this._programsList = [];
    this._ownedPrograms = new Map();

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  purchaseProgram(programParameters: IMakeProgramParameters): boolean {
    if (!this._globalState.unlockedFeatures.isFeatureUnlocked(Feature.mainframeUpgrades)) {
      return false;
    }

    if (
      !this._globalState.availableItems.programs.isItemAvailable(
        programParameters.name,
        programParameters.quality,
        programParameters.level,
      )
    ) {
      return false;
    }

    const program = this._mainframeState.programFactory.makeProgram(programParameters);

    const bought = this._globalState.money.purchase(
      program.cost,
      PurchaseType.mainframePrograms,
      this.handlePurchaseProgram(program),
    );

    if (!bought) {
      program.removeAllEventListeners();
    }

    return bought;
  }

  upgradeMaxProgram(name: ProgramName): boolean {
    const existingProgram = this.getOwnedProgramByName(name);

    if (!existingProgram) {
      return false;
    }

    const checkProgramUpgrade = this.handleCheckProgramUpgrade(existingProgram);
    const level = binarySearchDecimal(existingProgram.level, this._globalState.development.level, checkProgramUpgrade);

    if (level <= existingProgram.level) {
      return false;
    }

    return this.purchaseProgram({
      name,
      quality: existingProgram.quality,
      level,
      autoUpgradeEnabled: true,
    });
  }

  upgradeMaxAllPrograms(): void {
    for (const program of this._programsList) {
      if (program.autoUpgradeEnabled) {
        this.upgradeMaxProgram(program.name);
      }
    }
  }

  listOwnedPrograms(): IProgram[] {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_PROGRAMS_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED);

    return this._programsList;
  }

  getOwnedProgramByName(name: ProgramName): IProgram | undefined {
    return this._ownedPrograms.get(name);
  }

  toggleProgramsAutoUpgrade(active: boolean) {
    for (const program of this._ownedPrograms.values()) {
      program.autoUpgradeEnabled = active;
    }

    this.requestUiUpdate();
  }

  requestUiUpdate() {
    this.uiEventBatcher.enqueueEvent(MAINFRAME_PROGRAMS_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED);
  }

  moveProgram(programName: ProgramName, newPosition: number) {
    const oldPosition = this._programsList.findIndex((program) => program.name === programName);

    if (oldPosition === -1) {
      return;
    }

    moveElementInArray(this._programsList, oldPosition, newPosition);

    this.requestUiUpdate();
  }

  async startNewState(): Promise<void> {
    this.clearState();

    for (const programName of this._globalState.scenario.currentValues.mainframeSoftware.programs) {
      this.addProgram(
        this._mainframeState.programFactory.makeProgram({
          name: programName,
          quality: 0,
          level: 1,
          autoUpgradeEnabled: true,
        }),
      );
    }

    this.requestUiUpdate();
  }

  async deserialize(serializedState: IMainframeProgramsSerializedState): Promise<void> {
    this.clearState();

    serializedState.ownedPrograms.forEach((programParameters) => {
      const program = this._mainframeState.programFactory.makeProgram(programParameters);
      this._ownedPrograms.set(programParameters.name, program);
      this._programsList.push(program);
    });

    this.requestUiUpdate();
  }

  serialize(): IMainframeProgramsSerializedState {
    return {
      ownedPrograms: this._programsList.map((program) => program.serialize()),
    };
  }

  private addProgram(newProgram: IProgram): void {
    const existingProgram = this._ownedPrograms.get(newProgram.name);

    if (existingProgram) {
      existingProgram.upgrade(newProgram);
      newProgram.removeAllEventListeners();
    } else {
      this._ownedPrograms.set(newProgram.name, newProgram);
      this._programsList.push(newProgram);
    }

    this.requestUiUpdate();
  }

  private handlePurchaseProgram = (newProgram: IProgram) => () => {
    this.addProgram(newProgram);

    const programTitle = PROGRAM_TEXTS[newProgram.name].title();
    const formattedLevel = this._formatter.formatNumberDecimal(newProgram.level);
    const formattedQuality = this._formatter.formatQuality(newProgram.quality);
    this._messageLogState.postMessage(
      PurchaseEvent.programPurchased,
      msg(
        str`Program "${programTitle}" with level ${formattedLevel} and quality ${formattedQuality} has been purchased`,
      ),
    );

    for (const feature of newProgram.unlockFeatures) {
      this._globalState.unlockedFeatures.unlockFeature(feature);
    }
  };

  private clearState() {
    for (const ownedProgram of this._programsList) {
      ownedProgram.removeAllEventListeners();
    }

    this._ownedPrograms.clear();
    this._programsList.length = 0;
  }

  private handleCheckProgramUpgrade = (existingProgram: IProgram) => (level: number) => {
    if (
      !this._globalState.availableItems.programs.isItemAvailable(existingProgram.name, existingProgram.quality, level)
    ) {
      return false;
    }

    const program = this._mainframeState.programFactory.makeProgram({
      name: existingProgram.name,
      quality: existingProgram.quality,
      level,
      autoUpgradeEnabled: true,
    });
    program.removeAllEventListeners();

    return program.cost <= this._globalState.money.money;
  };
}
