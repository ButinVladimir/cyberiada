import { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';

export interface IMainframeSerializedState {
  performance: number;
  cores: number;
  ram: number;
  ownedPrograms: IMakeProgramParameters[];
}
