import { IProgram } from '@state/progam-factory/interfaces/program';
import { IFormatter } from '@shared/interfaces/formatter';

export interface IDescriptionParameters {
  formatter: IFormatter;
  usedCores: number;
  availableRam: number;
  program: IProgram;
  threads: number;
}
