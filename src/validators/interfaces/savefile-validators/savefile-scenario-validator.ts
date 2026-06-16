import { IScenarioSerializedState } from "@state/scenario-state";

export interface ISavefileScenarioValidator {
  validate(state: IScenarioSerializedState): void;
}
