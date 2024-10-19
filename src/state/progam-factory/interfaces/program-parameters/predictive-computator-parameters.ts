import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface IPredictiveComputatorParameters extends IBaseProgramParameters {
  scenarioState: IScenarioState;
}
