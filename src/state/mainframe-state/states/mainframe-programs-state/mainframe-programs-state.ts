import { inject, injectable } from 'inversify';
import { msg, str } from '@lit/localize';
import { decorators } from '@state/container';
import programs from '@configs/programs.json';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { IExponentWithQuality } from '@shared/interfaces/exponent-with-quality';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { TYPES } from '@state/types';
import { Feature, PurchaseEvent, PurchaseType } from '@shared/types';
import { calculatePowWithQuality } from '@shared/helpers';
import { EventBatcher } from '@shared/event-batcher';
import { binarySearchDecimal, moveElementInArray } from '@shared/helpers';
import { PROGRAM_TEXTS } from '@texts/programs';
import { IMainframeProgramsState, IMainframeProgramsSerializedState } from './interfaces';
import { MAINFRAME_PROGRAMS_STATE_UI_EVENTS } from './constants';
import { ProgramName } from '../progam-factory/types';
import { IProgram } from '../progam-factory/interfaces';

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

  getProgramCost(name: ProgramName, quality: number, level: number): number {
    const programData = programs[name];

    return (
      calculatePowWithQuality(level - 1, quality, programData.cost as IExponentWithQuality) /
      this._globalState.multipliers.codeBase.totalMultiplier
    );
  }

  purchaseProgram(name: ProgramName, quality: number, level: number): boolean {
    if (!this._globalState.unlockedFeatures.isFeatureUnlocked(Feature.mainframeUpgrades)) {
      return false;
    }

    if (!this._globalState.availableItems.programs.isItemAvailable(name, quality, level)) {
      return false;
    }

    const cost = this.getProgramCost(name, quality, level);

    const bought = this._globalState.money.purchase(
      cost,
      PurchaseType.mainframePrograms,
      this.handlePurchaseProgram(name, quality, level),
    );

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

    return this.purchaseProgram(name, existingProgram.quality, level);
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
      this.addProgram(programName, 0, 1);
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

  private addProgram(name: ProgramName, quality: number, level: number): void {
    const existingProgram = this._ownedPrograms.get(name);

    if (existingProgram) {
      existingProgram.upgrade(quality, level);
    } else {
      const newProgram = this._mainframeState.programFactory.makeProgram({
        name,
        quality,
        level,
        autoUpgradeEnabled: true,
      });

      this._ownedPrograms.set(newProgram.name, newProgram);
      this._programsList.push(newProgram);

      for (const feature of newProgram.unlockFeatures) {
        this._globalState.unlockedFeatures.unlockFeature(feature);
      }
    }

    this.requestUiUpdate();
  }

  private handlePurchaseProgram = (name: ProgramName, quality: number, level: number) => () => {
    this.addProgram(name, quality, level);

    const programTitle = PROGRAM_TEXTS[name].title();
    const formattedLevel = this._formatter.formatNumberDecimal(level);
    const formattedQuality = this._formatter.formatQuality(quality);
    this._messageLogState.postMessage(
      PurchaseEvent.programPurchased,
      msg(
        str`Program "${programTitle}" with quality ${formattedQuality} and level ${formattedLevel} has been purchased`,
      ),
    );
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

    const cost = this.getProgramCost(existingProgram.name, existingProgram.quality, level);

    return cost <= this._globalState.money.money;
  };
}
