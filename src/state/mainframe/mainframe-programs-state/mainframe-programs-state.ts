import { inject, injectable } from 'inversify';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';
import type { IProgramFactory } from '@state/progam-factory/interfaces/program-factory';
import { IProgram } from '@state/progam-factory/interfaces/program';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { ProgramName } from '@state/progam-factory/types';
import { PurchaseEvent, PurchaseType } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import { moveElementInArray } from '@shared/helpers';
import { IMainframeProgramsState, IMainframeProgramsSerializedState } from './interfaces';
import { MAINFRAME_PROGRAMS_STATE_UI_EVENTS } from './constants';

@injectable()
export class MainframeProgramsState implements IMainframeProgramsState {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;
  private _programFactory: IProgramFactory;
  private _scenarioState: IScenarioState;
  private _globalState: IGlobalState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private _programsList: IProgram[];
  private _ownedPrograms: Map<ProgramName, IProgram>;

  constructor(
    @inject(TYPES.StateUIConnector) _stateUiConnector: IStateUIConnector,
    @inject(TYPES.ProgramFactory) _programFactory: IProgramFactory,
    @inject(TYPES.ScenarioState) _scenarioState: IScenarioState,
    @inject(TYPES.GlobalState) _globalState: IGlobalState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.Formatter) _formatter: IFormatter,
  ) {
    this._stateUiConnector = _stateUiConnector;
    this._programFactory = _programFactory;
    this._scenarioState = _scenarioState;
    this._globalState = _globalState;
    this._messageLogState = _messageLogState;
    this._formatter = _formatter;

    this._programsList = [];
    this._ownedPrograms = new Map();

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  purchaseProgram(programParameters: IMakeProgramParameters): boolean {
    if (programParameters.level > this._globalState.cityDevelopment.level) {
      throw new Error(`Cannot purchase program ${programParameters.name} with level above city level`);
    }

    const existingProgram = this.getOwnedProgramByName(programParameters.name);
    const program = this._programFactory.makeProgram(programParameters);

    const bought = this._globalState.money.purchase(
      program.cost,
      PurchaseType.mainframePrograms,
      this.handlePurchaseProgram(program),
    );

    if (!bought || existingProgram) {
      this._programFactory.deleteProgram(program);
    }

    return bought;
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

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this.clearState();

    for (const programName of this._scenarioState.currentValues.mainframeSoftware.startingPrograms) {
      this.addProgram(
        this._programFactory.makeProgram({
          name: programName,
          level: 1,
          quality: 0,
          autoUpgradeEnabled: true,
        }),
      );
    }

    this.requestUiUpdate();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeProgramsSerializedState): Promise<void> {
    this.clearState();

    serializedState.ownedPrograms.forEach((programParameters) => {
      const program = this._programFactory.makeProgram(programParameters);
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

  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this.uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this.uiEventBatcher.removeListener(eventName, handler);
  }

  fireUiEvents() {
    this.uiEventBatcher.fireEvents();
  }

  private addProgram(newProgram: IProgram): void {
    const existingProgram = this._ownedPrograms.get(newProgram.name);

    if (existingProgram) {
      existingProgram.update(newProgram);
    } else {
      this._ownedPrograms.set(newProgram.name, newProgram);
      this._programsList.push(newProgram);
    }

    this.requestUiUpdate();
  }

  private handlePurchaseProgram = (newProgram: IProgram) => () => {
    this.addProgram(newProgram);

    this._messageLogState.postMessage(PurchaseEvent.programPurchased, {
      programName: newProgram.name,
      level: this._formatter.formatNumberDecimal(newProgram.level),
      quality: this._formatter.formatQuality(newProgram.quality),
    });
  };

  private clearState() {
    for (const ownedProgram of this._programsList) {
      this._programFactory.deleteProgram(ownedProgram);
    }

    this._ownedPrograms.clear();
    this._programsList = [];
  }
}
