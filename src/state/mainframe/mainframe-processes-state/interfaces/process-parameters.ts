import { IProgram } from '@state/progam-factory/interfaces/program';
import { IGlobalState } from '@state/global-state/interfaces/global-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IMainframeProcessesState } from './mainframe-processes-state';

export interface IProcessParameters {
  mainframeProcessesState: IMainframeProcessesState;
  globalState: IGlobalState;
  scenarioState: IScenarioState;
  program: IProgram;
  isActive: boolean;
  threads: number;
  currentCompletionPoints: number;
}
