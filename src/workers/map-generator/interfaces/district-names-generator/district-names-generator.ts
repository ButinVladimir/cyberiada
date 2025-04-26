import { IDistrictNamesGeneratorResult } from './district-names-generator-result';

export interface IDistrictNamesGenerator {
  generate(): IDistrictNamesGeneratorResult;
}
