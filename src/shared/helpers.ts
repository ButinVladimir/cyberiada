import clamp from 'lodash/clamp';
import { IExponent, ILinear, IQualityExponent, IQualityLinear } from './interfaces/formulas';

export const calculatePower = (exponent: number, params: IExponent): number => {
  return params.multiplier * Math.pow(params.base, exponent);
};

export const calculateQualityPower = (exponent: number, quality: number, params: IQualityExponent): number => {
  return calculatePower(exponent, params) * calculateQualityMultiplier(quality, params.baseQuality);
};

export const calculateLinear = (level: number, params: ILinear): number => {
  return params.base + level * params.multiplier;
};

export const calculateQualityLinear = (level: number, quality: number, params: IQualityLinear): number => {
  return calculateLinear(level, params) * calculateQualityMultiplier(quality, params.baseQuality);
};

export const calculateQualityMultiplier = (quality: number, base: number): number => {
  return Math.pow(base, quality);
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
  return clamp(Math.floor(value), 0, 100);
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

export const calculateGeometricProgressionSum = (level: number, multiplier: number, base: number): number =>
  (multiplier * (Math.pow(base, level + 1) - 1)) / (base - 1);

export const reverseGeometricProgressionSum = (points: number, multiplier: number, base: number): number =>
  Math.floor(Math.log(1 + (points * (base - 1)) / multiplier) / Math.log(base));

export function removeElementsFromArray<T>(array: T[], fromIndex: number, count: number): void {
  if (fromIndex + count >= array.length) {
    array.length = fromIndex;
    return;
  }

  let index = fromIndex;

  while (index + count < array.length) {
    array[index] = array[index + count];
    index++;
  }

  array.length -= count;
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function calculateLevelProgressPercentage(
  basePoints: number,
  currentPoints: number,
  nextLevelPoints: number,
): number {
  const currentDistance = currentPoints - basePoints;
  const nextLevelDistance = nextLevelPoints - basePoints;

  const percentage = (currentDistance / nextLevelDistance) * 100;

  if (percentage < 0) {
    return 0;
  }

  if (percentage > 100) {
    return 100;
  }

  return percentage;
}
