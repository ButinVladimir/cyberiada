import { ISerializeable } from '@shared/interfaces/serializable';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { IMainframeProgramsSerializedState } from './mainframe-programs-serialized-state';

export interface IMainframeProgramsState extends ISerializeable<IMainframeProgramsSerializedState> {
  getProgramCost(name: ProgramName, tier: number, level: number): number;
  purchaseProgram(name: ProgramName, tier: number, level: number): boolean;
  upgradeMaxProgram(name: ProgramName): boolean;
  upgradeMaxAllPrograms(): void;
  listOwnedPrograms(): IProgram[];
  getOwnedProgramByName(name: ProgramName): IProgram | undefined;
  toggleProgramsAutoUpgrade(active: boolean): void;
  moveProgram(programName: ProgramName, newPosition: number): void;
}
