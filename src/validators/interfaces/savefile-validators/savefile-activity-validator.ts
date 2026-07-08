import { ISerializedState } from '@state/app-state';
import { IActivitySerializedState } from '@state/activity-state';

export interface ISavefileActivityValidator {
  validate(state: IActivitySerializedState, fullState: ISerializedState): void;
}
