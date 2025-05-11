import { IDistrictSerializedState } from './district-serialized-state';

export interface ICitySerializedState {
  layout: number[][];
  districts: Record<number, IDistrictSerializedState>;
}
