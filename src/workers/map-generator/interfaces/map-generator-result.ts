import { IMapGeneratorDistrictResult } from './map-generator-district-result';

export interface IMapGeneratorResult {
  map: number[][];
  districts: Record<number, IMapGeneratorDistrictResult>;
}
