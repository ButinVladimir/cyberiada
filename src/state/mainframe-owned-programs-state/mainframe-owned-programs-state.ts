import { inject, injectable } from 'inversify';
import { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';
import type { IProgramFactory } from '@state/progam-factory/interfaces/program-factory';
import { IProgram } from '@state/progam-factory/interfaces/program';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { TYPES } from '@state/types';
import { ProgramName } from '@state/progam-factory/types';
import { PurchaseEvent } from '@shared/types';
import { formatQuality } from '@shared/formatters';
import { IMainframeOwnedProgramsState, IMainframeOwnedProgramsSerializedState } from './interfaces';

@injectable()
export class MainframeOwnedProgramsState implements IMainframeOwnedProgramsState {
  private _programFactory: IProgramFactory;
  private _generalState: IGeneralState;
  private _messageLogState: IMessageLogState;

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
  }

  purchaseProgram(programParameters: IMakeProgramParameters): boolean {
    const program = this._programFactory.makeProgram(programParameters);

    return this._generalState.purchase(program.getCost(), this.handlePurchaseProgram(program));
  }

  listOwnedPrograms(): IProgram[] {
    return Array.from(this._ownedPrograms.values());
  }

  getOwnedProgramByName(name: ProgramName): IProgram | undefined {
    return this._ownedPrograms.get(name)!;
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

  handlePurchaseProgram = (program: IProgram) => () => {
    this._ownedPrograms.set(program.name, program);

    this._messageLogState.postMessage(PurchaseEvent.programPurchased, {
      programName: program.name,
      level: program.level,
      quality: formatQuality(program.quality),
    });
  };
}
