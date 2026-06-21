import { IUnlockSerializedState } from '@state/unlock-state';

export interface ISavefileUnlockValidator {
  validate(state: IUnlockSerializedState): void;
}
