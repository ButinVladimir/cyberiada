import { IProgram } from '@state/progam-factory/interfaces/program';
import { IFormatter } from '@shared/interfaces/formatter';

export interface IDescriptionParameters {
  formatter: IFormatter;
  cores: number;
  ram: number;
  program: IProgram;
  ownedProgram?: IProgram;
}
