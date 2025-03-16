import { IFormatter } from '@shared/interfaces/formatter';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';

export interface IDescriptionParameters {
  formatter: IFormatter;
  autoscalableProcessRam: number;
  process: IProcess;
}
