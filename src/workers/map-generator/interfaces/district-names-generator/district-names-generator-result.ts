import { IDistrictNamesGeneratorDistrictResult } from './district-names-generator-district-result';

export interface IDistrictNamesGeneratorResult {
  districts: Record<number, IDistrictNamesGeneratorDistrictResult>;
}
