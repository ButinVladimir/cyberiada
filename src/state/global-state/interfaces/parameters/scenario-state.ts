import { ISerializeable } from '@shared/interfaces';
import { Scenario } from '@shared/types';
import { IScenarioSerializedState } from '../serialized-states/scenario-serialized-state';
import { IScenarioValues } from '../scenario-values';

export interface IScenarioState extends ISerializeable<IScenarioSerializedState> {
  scenario: Scenario;
  currentValues: IScenarioValues;
  getScenarioValues(scenario: Scenario): IScenarioValues;
}
