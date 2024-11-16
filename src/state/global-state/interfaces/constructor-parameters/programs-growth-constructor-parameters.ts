import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';

export interface IProgramsGrowthConstructorParameters {
  stateUiConnector: IStateUIConnector;
  mainframeProcessesState: IMainframeProcessesState;
}
