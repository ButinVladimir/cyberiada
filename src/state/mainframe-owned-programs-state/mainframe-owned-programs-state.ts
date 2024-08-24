import { inject, injectable } from 'inversify';
import { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';
import type { IProgramFactory } from '@state/progam-factory/interfaces/program-factory';
import { IProgram } from '@state/progam-factory/interfaces/program';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { TYPES } from '@state/types';
import { ProgramName } from '@state/progam-factory/types';
import { PurchaseEvent } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import { IMainframeOwnedProgramsState, IMainframeOwnedProgramsSerializedState } from './interfaces';
import { MAINFRAME_OWNED_PROGRAMES_STATE_UI_EVENTS } from './constants';

@injectable()
export class MainframeOwnedProgramsState implements IMainframeOwnedProgramsState {
  private _programFactory: IProgramFactory;
  private _generalState: IGeneralState;
  private _messageLogState: IMessageLogState;

  private readonly _uiEventBatcher: EventBatcher;

  private _ownedPrograms: Map<ProgramName, IProgram>;

  constructor(
    @inject(TYPES.ProgramFactory) _programFactory: IProgramFactory,
    @inject(TYPES.GeneralState) _generalState: IGeneralState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
  ) {
    this._programFactory = _programFactory;
    this._generalState = _generalState;
    this._messageLogState = _messageLogState;

    this._ownedPrograms = new Map();

    this._uiEventBatcher = new EventBatcher();
  }

  addProgram(newProgram: IProgram): void {
    const existingProgram = this._ownedPrograms.get(newProgram.name);

    if (existingProgram) {
      existingProgram.updateProgram(newProgram);
    } else {
      this._ownedPrograms.set(newProgram.name, newProgram);
    }

    this._uiEventBatcher.enqueueEvent(MAINFRAME_OWNED_PROGRAMES_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED);
  }

  purchaseProgram(programParameters: IMakeProgramParameters): boolean {
    const program = this._programFactory.makeProgram(programParameters);

    return this._generalState.purchase(program.getCost(), this.handlePurchaseProgram(program));
  }

  listOwnedPrograms(): IProgram[] {
    return Array.from(this._ownedPrograms.values());
  }

  getOwnedProgramByName(name: ProgramName): IProgram | undefined {
    return this._ownedPrograms.get(name);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._ownedPrograms.clear();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeOwnedProgramsSerializedState): Promise<void> {
    this._ownedPrograms.clear();
    serializedState.ownedPrograms.forEach((programParameters) => {
      const program = this._programFactory.makeProgram(programParameters);
      this._ownedPrograms.set(programParameters.name, program);
    });
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
      level: newProgram.level,
      quality: newProgram.quality,
    });
  };
}
