import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IGlobalState } from '@state/global-state/interfaces/global-state';
import { IFormatter } from '@shared/interfaces/formatter';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IMainframeProgramsState } from '@state/mainframe/mainframe-programs-state/interfaces/mainframe-programs-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';

export interface IBaseProgramParameters {
  formatter: IFormatter;
  level: number;
  quality: number;
  autoUpgradeEnabled: boolean;
  stateUiConnector: IStateUIConnector;
  globalState: IGlobalState;
  mainframeProgramsState: IMainframeProgramsState;
  mainframeProcessesState: IMainframeProcessesState;
  mainframeHardwareState: IMainframeHardwareState;
  scenarioState: IScenarioState;
}
