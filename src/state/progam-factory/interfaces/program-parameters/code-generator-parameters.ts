import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface ICodeGeneratorParameters extends IBaseProgramParameters {
  scenarioState: IScenarioState;
}
