import { IDistrictSerializedInfo } from './district-serialized-info';

export interface ICitySerializedState {
  layout: number[][];
  districts: Record<number, IDistrictSerializedInfo>;
}
