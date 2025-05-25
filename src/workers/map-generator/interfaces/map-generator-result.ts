import { IMapGeneratorDistrictResult } from './map-generator-district-result';

export interface IMapGeneratorResult {
  layout: number[][];
  districts: Record<number, IMapGeneratorDistrictResult>;
  randomShift: bigint;
}
