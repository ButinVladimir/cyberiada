import { ISerializedState } from "@state/app-state";

export interface ISavefileValidatorFacade {
  validate(serializedState: ISerializedState): Promise<void>;
}
