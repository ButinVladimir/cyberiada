import { IExponent } from './interfaces/exponent';

export const calculatePow = (exponent: number, params: IExponent) => {
  return params.baseMultiplier * Math.pow(params.base, exponent);
};

export const binarySearchDecimal = (
  minValue: number,
  maxValue: number,
  checkFn: (value: number) => boolean,
): number => {
  let value = minValue;
  let step = maxValue - minValue;
  let nextValue;

  while (step > 0) {
    nextValue = value + step;

    if (nextValue <= maxValue && checkFn(nextValue)) {
      value = nextValue;
    } else {
      step = Math.floor(step / 2);
    }
  }

  return value;
};
