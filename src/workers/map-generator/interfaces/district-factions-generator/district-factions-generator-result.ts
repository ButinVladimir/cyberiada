import { IDistrictFactionsGeneratorDistrictResult } from './district-factions-generator-district-result';

export interface IDistrictFactionsGeneratorResult {
  districts: Record<number, IDistrictFactionsGeneratorDistrictResult>;
}
