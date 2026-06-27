import { IClonesSerializedState } from '@state/clones-state';

export interface ISavefileClonesValidator {
  validate(state: IClonesSerializedState): void;
}
