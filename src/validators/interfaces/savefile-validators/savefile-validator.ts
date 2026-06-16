import { ISerializedState } from "@state/app-state";

export interface ISavefileValidator {
  validate(state: ISerializedState): void;
}
