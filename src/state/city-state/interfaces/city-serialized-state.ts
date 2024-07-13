import { Scenario } from '@/shared';
import { IDistrictSerializedInfo } from './district-serialized-info';

export interface ICitySerializedState {
  scenario: Scenario;
  map: number[][];
  districts: Record<number, IDistrictSerializedInfo>;
}
