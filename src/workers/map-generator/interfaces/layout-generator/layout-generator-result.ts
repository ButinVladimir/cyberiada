import { ILayoutGeneratorDistrictResult } from './layout-generator-district-result';

export interface ILayoutGeneratorResult {
  layout: number[][];
  districts: Record<number, ILayoutGeneratorDistrictResult>;
}
