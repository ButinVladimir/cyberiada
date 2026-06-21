import { IFactionSerializedState } from '@state/faction-state';

export interface ISavefileFactionValidator {
  validate(state: IFactionSerializedState): void;
}
