import { IAutomationSerializedState } from '@state/automation-state';
import { ISerializedState } from '@state/app-state';

export interface ISavefileAutomationValidator {
  validate(state: IAutomationSerializedState, fullState: ISerializedState): void;
}
