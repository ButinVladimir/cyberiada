import { IExponent } from './interfaces/exponent';

export const calculatePow = (exponent: number, params: IExponent) => {
  return params.baseMultiplier * Math.pow(params.base, exponent);
};
