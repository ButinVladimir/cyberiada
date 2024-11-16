import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';

export interface IProgramCompletionSpeedConstructorParameters {
  stateUiConnector: IStateUIConnector;
  mainframeProcessesState: IMainframeProcessesState;
  mainframeHardwareState: IMainframeHardwareState;
  scenarioState: IScenarioState;
}
