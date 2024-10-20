import { IGeneralState } from '@state/general-state';
import { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import { IFormatter } from '@shared/interfaces/formatter';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';

export interface IBaseProgramParameters {
  formatter: IFormatter;
  level: number;
  quality: number;
  generalState: IGeneralState;
  growthState: IGrowthState;
  mainframeProcessesState: IMainframeProcessesState;
  mainframeHardwareState: IMainframeHardwareState;
}
