import { IQualityFormatter } from '../interfaces';
import { ROMAN_NUMERALS } from './constants';

export class QualityFormatter implements IQualityFormatter {
  private _cache: Map<number, string>;

  constructor() {
    this._cache = new Map<number, string>();
  }

  format(value: number): string {
    const cachedValue = this._cache.get(value);

    if (cachedValue) {
      return cachedValue;
    }

    const transformedValue = this.transform(value);
    this._cache.set(value, transformedValue);

    return transformedValue;
  }

  private transform(value: number): string {
    let result = '';
    let remainder = value + 1;
    let nextValue: number;
    let nextLetters: string;

    for (let i = 0; i < ROMAN_NUMERALS.length; i++) {
      nextValue = ROMAN_NUMERALS[i].value;
      nextLetters = ROMAN_NUMERALS[i].letter;

      while (remainder >= nextValue) {
        remainder -= nextValue;
        result += nextLetters;
      }

      for (let j = ROMAN_NUMERALS.length - 1; j > i; j--) {
        if (ROMAN_NUMERALS[i].value === ROMAN_NUMERALS[j].value * 2) {
          continue;
        }

        nextValue = ROMAN_NUMERALS[i].value - ROMAN_NUMERALS[j].value;
        nextLetters = ROMAN_NUMERALS[j].letter + ROMAN_NUMERALS[i].letter;

        while (remainder >= nextValue) {
          remainder -= nextValue;
          result += nextLetters;
        }
      }
    }

    return result;
  }
}
