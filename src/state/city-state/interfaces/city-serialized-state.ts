import { Scenario } from '@shared/types';
import { IDistrictSerializedInfo } from './district-serialized-info';

export interface ICitySerializedState {
  scenario: Scenario;
  map: number[][];
  districts: Record<number, IDistrictSerializedInfo>;
}
