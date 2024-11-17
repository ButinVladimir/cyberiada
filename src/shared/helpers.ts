import { IExponent } from './interfaces/exponent';

export const calculatePow = (exponent: number, params: IExponent): number => {
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

export const normalizePercentage = (value: number): number => {
  if (value < 0) {
    return 0;
  }

  if (value > 100) {
    return 100;
  }

  return Math.floor(value);
};

export const checkPercentage = (value: number): boolean => {
  return value >= 0 && value <= 100;
};

export function moveElementInArray<T>(array: T[], fromIndex: number, toIndex: number): void {
  let fixedToIndex = toIndex;

  if (fixedToIndex < 0) {
    fixedToIndex = 0;
  }

  if (fixedToIndex >= array.length) {
    fixedToIndex = array.length - 1;
  }

  const movedElement = array[fromIndex];

  if (fromIndex < fixedToIndex) {
    for (let i = fromIndex; i < fixedToIndex; i++) {
      array[i] = array[i + 1];
    }
  } else {
    for (let i = fromIndex; i > fixedToIndex; i--) {
      array[i] = array[i - 1];
    }
  }

  array[fixedToIndex] = movedElement;
}
