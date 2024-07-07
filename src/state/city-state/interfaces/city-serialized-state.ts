import { IDistrictSerializedInfo } from "./district-serialized-info";

export interface ICitySerializedState {
  map: number[][];
  districts: Record<number, IDistrictSerializedInfo>;
}
