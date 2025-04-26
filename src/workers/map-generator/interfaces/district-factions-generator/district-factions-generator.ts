import { IDistrictFactionsGeneratorResult } from './district-factions-generator-result';

export interface IDistrictFactionsGenerator {
  generate(): Promise<IDistrictFactionsGeneratorResult>;
}
