import { IGeneralState } from '@state/general-state';
import { IFormatter } from '@shared/interfaces/formatter';

export interface IBaseProgramParameters {
  formatter: IFormatter;
  level: number;
  quality: number;
  generalState: IGeneralState;
}
