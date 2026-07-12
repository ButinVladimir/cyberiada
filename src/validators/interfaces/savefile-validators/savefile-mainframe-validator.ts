import { IMainframeSerializedState } from '@state/mainframe-state';

export interface ISavefileMainframeValidator {
  validate(state: IMainframeSerializedState): void;
}
