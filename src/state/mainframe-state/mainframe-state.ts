import { inject, injectable } from 'inversify';
import { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';
import type { IProgramFactory } from '@state/progam-factory/interfaces/program-factory';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { TYPES } from '@state/types';
import constants from '@configs/constants.json';
import { IMainframeState, IMainframeSerializedState } from './interfaces';
import { ProgramName } from '@state/progam-factory/types';

@injectable()
export class MainframeState implements IMainframeState {
  private _programFactory: IProgramFactory;

  private _performance: number;
  private _cores: number;
  private _ram: number;
  private _ownedPrograms: Map<ProgramName, IProgram>;

  constructor(@inject(TYPES.ProgramFactory) _programFactory: IProgramFactory) {
    this._programFactory = _programFactory;

    this._performance = constants.startingSettings.mainframe.performanceLevel;
    this._cores = constants.startingSettings.mainframe.coresLevel;
    this._ram = constants.startingSettings.mainframe.ramLevel;

    this._ownedPrograms = new Map();
  }

  get performance() {
    return this._performance;
  }

  get cores() {
    return this._cores;
  }

  get ram() {
    return this._ram;
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
    this._performance = constants.startingSettings.mainframe.performanceLevel;
    this._cores = constants.startingSettings.mainframe.coresLevel;
    this._ram = constants.startingSettings.mainframe.ramLevel;

    this._ownedPrograms.clear();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeSerializedState): Promise<void> {
    this._performance = serializedState.performance;
    this._cores = serializedState.cores;
    this._ram = serializedState.ram;

    this._ownedPrograms.clear();
    serializedState.ownedPrograms.forEach((programParameters) => {
      const program = this._programFactory.makeProgram(programParameters);
      this._ownedPrograms.set(programParameters.name, program);
    });
  }

  serialize(): IMainframeSerializedState {
    return {
      performance: this.performance,
      cores: this.cores,
      ram: this.ram,
      ownedPrograms: this.listOwnedPrograms().map((program) => program.serialize()),
    };
  }
}
