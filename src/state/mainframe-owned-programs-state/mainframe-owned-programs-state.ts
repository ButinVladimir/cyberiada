import { inject, injectable } from 'inversify';
import { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';
import type { IProgramFactory } from '@state/progam-factory/interfaces/program-factory';
import { IProgram } from '@state/progam-factory/interfaces/program';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { ProgramName } from '@state/progam-factory/types';
import { PurchaseEvent } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import { IMainframeOwnedProgramsState, IMainframeOwnedProgramsSerializedState } from './interfaces';
import { MAINFRAME_OWNED_PROGRAMES_STATE_UI_EVENTS } from './constants';

@injectable()
export class MainframeOwnedProgramsState implements IMainframeOwnedProgramsState {
  private _programFactory: IProgramFactory;
  private _scenarioState: IScenarioState;
  private _generalState: IGeneralState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private readonly _uiEventBatcher: EventBatcher;

  private _ownedPrograms: Map<ProgramName, IProgram>;

  constructor(
    @inject(TYPES.ProgramFactory) _programFactory: IProgramFactory,
    @inject(TYPES.ScenarioState) _scenarioState: IScenarioState,
    @inject(TYPES.GeneralState) _generalState: IGeneralState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.Formatter) _formatter: IFormatter,
  ) {
    this._programFactory = _programFactory;
    this._scenarioState = _scenarioState;
    this._generalState = _generalState;
    this._messageLogState = _messageLogState;
    this._formatter = _formatter;

    this._ownedPrograms = new Map();

    this._uiEventBatcher = new EventBatcher();
  }

  addProgram(newProgram: IProgram): void {
    const existingProgram = this._ownedPrograms.get(newProgram.name);

    if (existingProgram) {
      existingProgram.update(newProgram);
    } else {
      this._ownedPrograms.set(newProgram.name, newProgram);
    }

    this._uiEventBatcher.enqueueEvent(MAINFRAME_OWNED_PROGRAMES_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED);
  }

  purchaseProgram(programParameters: IMakeProgramParameters): boolean {
    if (programParameters.level > this._generalState.cityLevel) {
      throw new Error(`Cannot purchase program ${programParameters.name} with level above city level`);
    }

    const program = this._programFactory.makeProgram(programParameters);

    const bought = this._generalState.purchase(program.cost, this.handlePurchaseProgram(program));

    if (this.getOwnedProgramByName(programParameters.name) !== program) {
      this._programFactory.deleteProgram(program);
    }

    return bought;
  }

  listOwnedPrograms(): IProgram[] {
    return Array.from(this._ownedPrograms.values());
  }

  getOwnedProgramByName(name: ProgramName): IProgram | undefined {
    return this._ownedPrograms.get(name);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this.clearState();

    for (const programName of this._scenarioState.currentValues.startingPrograms) {
      this.addProgram(
        this._programFactory.makeProgram({
          name: programName,
          level: 1,
          quality: 0,
        }),
      );
    }

    this._uiEventBatcher.enqueueEvent(MAINFRAME_OWNED_PROGRAMES_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeOwnedProgramsSerializedState): Promise<void> {
    this.clearState();

    serializedState.ownedPrograms.forEach((programParameters) => {
      const program = this._programFactory.makeProgram(programParameters);
      this._ownedPrograms.set(programParameters.name, program);
    });

    this._uiEventBatcher.enqueueEvent(MAINFRAME_OWNED_PROGRAMES_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED);
  }

  serialize(): IMainframeOwnedProgramsSerializedState {
    return {
      ownedPrograms: this.listOwnedPrograms().map((program) => program.serialize()),
    };
  }

  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.removeListener(eventName, handler);
  }

  fireUiEvents() {
    this._uiEventBatcher.fireEvents();
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
    for (const ownedProgram of this._ownedPrograms.values()) {
      this._programFactory.deleteProgram(ownedProgram);
    }

    this._ownedPrograms.clear();
  }
}
