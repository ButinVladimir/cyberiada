import { IGlobalState } from '@state/global-state/interfaces/global-state';
import { IFormatter } from '@shared/interfaces/formatter';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';

export interface IBaseProgramParameters {
  formatter: IFormatter;
  level: number;
  quality: number;
  globalState: IGlobalState;
  mainframeProcessesState: IMainframeProcessesState;
  mainframeHardwareState: IMainframeHardwareState;
  scenarioState: IScenarioState;
}
