import { IFormatter } from '@shared/interfaces/formatter';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';

export interface IDescriptionParameters {
  formatter: IFormatter;
  availableRam: number;
  process: IProcess;
}
