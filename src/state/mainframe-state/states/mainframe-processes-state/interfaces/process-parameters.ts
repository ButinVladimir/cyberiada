import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { IMainframeProcessesState } from './mainframe-processes-state';

export interface IProcessParameters {
  stateUiConnector: IStateUIConnector;
  mainframeProcessesState: IMainframeProcessesState;
  program: IProgram;
  isActive: boolean;
  threads: number;
  currentCompletionPoints: number;
}
