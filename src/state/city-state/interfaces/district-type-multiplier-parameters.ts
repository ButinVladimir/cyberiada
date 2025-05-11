import { IExponent } from '@shared/interfaces/formulas/exponent';

export interface IDistrictTypeMultiplierParameters {
  pointsMultiplier: IExponent;
  pointsToSoftCap: IExponent;
  logBase: number;
}
