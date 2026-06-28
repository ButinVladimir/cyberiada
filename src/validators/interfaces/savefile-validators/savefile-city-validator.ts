import { ICitySerializedState } from '@state/city-state';

export interface ISavefileCityValidator {
  validate(state: ICitySerializedState): void;
}
