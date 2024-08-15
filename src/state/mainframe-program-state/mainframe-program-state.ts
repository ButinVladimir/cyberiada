import { inject, injectable } from 'inversify';
import { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';
import type { IProgramFactory } from '@state/progam-factory/interfaces/program-factory';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { TYPES } from '@state/types';
import { IMainframeProgramState, IMainframeProgramSerializedState } from './interfaces';
import { ProgramName } from '@state/progam-factory/types';

@injectable()
export class MainframeProgramState implements IMainframeProgramState {
  private _programFactory: IProgramFactory;

  private _ownedPrograms: Map<ProgramName, IProgram>;

  constructor(@inject(TYPES.ProgramFactory) _programFactory: IProgramFactory) {
    this._programFactory = _programFactory;

    this._ownedPrograms = new Map();
  }

  addProgram(programParameters: IMakeProgramParameters): void {
    const newProgram: IProgram = this._programFactory.makeProgram(programParameters);

    this._ownedPrograms.set(programParameters.name, newProgram);
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
  async deserialize(serializedState: IMainframeProgramSerializedState): Promise<void> {
    this._ownedPrograms.clear();
    serializedState.ownedPrograms.forEach((programParameters) => {
      const program = this._programFactory.makeProgram(programParameters);
      this._ownedPrograms.set(programParameters.name, program);
    });
  }

  serialize(): IMainframeProgramSerializedState {
    return {
      ownedPrograms: this.listOwnedPrograms().map((program) => program.serialize()),
    };
  }
}
