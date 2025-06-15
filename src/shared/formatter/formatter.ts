import { injectable } from 'inversify';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { TYPES } from '@state/types';
import { decorators } from '@state/container';
import { LongNumberFormat } from '../types';
import { IFormatterParameters, IFormatter, ITierFormatter } from '../interfaces';
import {
  SHORT_TIME_FORMAT_PARTS,
  DATE_TIME_FORMATTER_OPTIONS,
  DEFAULT_NUMBER_DECIMAL_FORMAT_PARAMETERS,
  DEFAULT_NUMBER_FLOAT_FORMAT_PARAMETERS,
  DEFAULT_NUMBER_TIER_FORMAT_PARAMETERS,
  DEFAULT_TIME_SHORT_FORMAT_PARAMETERS,
  DECIMAL_LONG_FORMATTER_OPTIONS,
  FLOAT_SHORT_FORMATTER_OPTIONS,
  FLOAT_LONG_FORMATTER_OPTIONS,
  FLOAT_SCIENTIFIC_FORMATTER_OPTIONS,
  FLOAT_ENGINEERING_FORMATTER_OPTIONS,
  LONG_NUMBER_FORMATTER_MAX_THRESHOLD,
  LONG_NUMBER_FORMATTER_MIN_THRESHOLD,
  LONG_TIME_FORMAT_PARTS,
} from './constants';
import { TierFormatter } from './tier-formatter';
import { msg, str } from '@lit/localize';

const { lazyInject } = decorators;

@injectable()
export class Formatter implements IFormatter {
  @lazyInject(TYPES.SettingsState)
  private _settingsState!: ISettingsState;

  private _decimalLongFormatter!: Intl.NumberFormat;
  private _floatLongFormatter!: Intl.NumberFormat;
  private _floatShortFormatter!: Intl.NumberFormat;
  private _floatScientificFormatter!: Intl.NumberFormat;
  private _floatEngineeringFormatter!: Intl.NumberFormat;
  private _dateTimeFormatter!: Intl.DateTimeFormat;
  private _tierFormatter: ITierFormatter;

  constructor() {
    this._tierFormatter = new TierFormatter();

    this.updateBuiltInFormatters();
  }

  formatTimeShort(time: number, parameters: IFormatterParameters = DEFAULT_TIME_SHORT_FORMAT_PARAMETERS): string {
    let remainingTime = Math.abs(time);
    let formattedTime = '';

    for (let unitNumber = 0; unitNumber < SHORT_TIME_FORMAT_PARTS.length; unitNumber++) {
      const { unit } = SHORT_TIME_FORMAT_PARTS[unitNumber];
      const value = Math.floor(remainingTime / unit);
      remainingTime = remainingTime - value * unit;

      formattedTime += this.formatNumberDecimal(value).padStart(2, '0');

      if (unitNumber < SHORT_TIME_FORMAT_PARTS.length - 1) {
        formattedTime += ':';
      }
    }

    return this.applyNumberFormatterParameters(time, formattedTime, parameters);
  }

  formatTimeLong(time: number, parameters: IFormatterParameters = DEFAULT_TIME_SHORT_FORMAT_PARAMETERS): string {
    let unitNumber = 0;
    let remainingTime = Math.abs(time);

    while (unitNumber < LONG_TIME_FORMAT_PARTS.length - 1) {
      const { unit: units } = LONG_TIME_FORMAT_PARTS[unitNumber];

      if (remainingTime >= units) {
        break;
      }

      unitNumber++;
    }

    if (unitNumber < LONG_TIME_FORMAT_PARTS.length - 1) {
      const { unitText: biggerUnitText, unit: biggerUnit } = LONG_TIME_FORMAT_PARTS[unitNumber];
      const { unitText: smallerUnitText, unit: smallerUnit } = LONG_TIME_FORMAT_PARTS[unitNumber + 1];

      const biggerValue = Math.floor(remainingTime / biggerUnit);
      remainingTime -= biggerValue * biggerUnit;
      const smallerValue = Math.ceil(remainingTime / smallerUnit);
      
      const biggerText = biggerUnitText(this.formatNumberDecimal(biggerValue));
      const smallerText = smallerUnitText(this.formatNumberDecimal(smallerValue));

      const formattedTime = msg(str`${biggerText} and ${smallerText}`);

      return this.applyNumberFormatterParameters(time, formattedTime, parameters);
    }

    const {unitText, unit} = LONG_TIME_FORMAT_PARTS[unitNumber];
    const value = Math.floor(remainingTime / unit);

    const formattedTime = unitText(this.formatNumberDecimal(value));

    return this.applyNumberFormatterParameters(time, formattedTime, parameters);
  }

  formatNumberFloat(value: number, parameters: IFormatterParameters = DEFAULT_NUMBER_FLOAT_FORMAT_PARAMETERS): string {
    const absoluteValue = Math.abs(value);
    const isLongValue = this.checkIfLongFormatNeeded(absoluteValue);

    if (!isLongValue) {
      const formattedValue = this._floatLongFormatter.format(absoluteValue);

      return this.applyNumberFormatterParameters(value, formattedValue, parameters);
    }

    return this.formatLongNumber(value, parameters);
  }

  formatNumberDecimal(
    value: number,
    parameters: IFormatterParameters = DEFAULT_NUMBER_DECIMAL_FORMAT_PARAMETERS,
  ): string {
    const absoluteValue = Math.abs(value);
    const isLongValue = this.checkIfLongFormatNeeded(absoluteValue);

    if (!isLongValue) {
      const formattedValue = this._decimalLongFormatter.format(absoluteValue);

      return this.applyNumberFormatterParameters(value, formattedValue, parameters);
    }

    return this.formatLongNumber(value, parameters);
  }

  formatLevel(value: number, parameters: IFormatterParameters = DEFAULT_NUMBER_DECIMAL_FORMAT_PARAMETERS): string {
    return this.formatNumberDecimal(value + 1, parameters);
  }

  formatTier(value: number, parameters: IFormatterParameters = DEFAULT_NUMBER_TIER_FORMAT_PARAMETERS): string {
    let formattedValue = '';

    if (value < 0) {
      formattedValue = '0';
    }
    {
      formattedValue = this._tierFormatter.format(value);
    }

    return this.applyNumberFormatterParameters(value, formattedValue, parameters);
  }

  formatDateTime(value: Date): string {
    return this._dateTimeFormatter.format(value);
  }

  updateBuiltInFormatters = () => {
    this._decimalLongFormatter = new Intl.NumberFormat(this._settingsState.language, DECIMAL_LONG_FORMATTER_OPTIONS);

    this._floatLongFormatter = new Intl.NumberFormat(this._settingsState.language, FLOAT_LONG_FORMATTER_OPTIONS);

    this._floatShortFormatter = new Intl.NumberFormat(this._settingsState.language, FLOAT_SHORT_FORMATTER_OPTIONS);

    this._floatScientificFormatter = new Intl.NumberFormat(
      this._settingsState.language,
      FLOAT_SCIENTIFIC_FORMATTER_OPTIONS,
    );

    this._floatEngineeringFormatter = new Intl.NumberFormat(
      this._settingsState.language,
      FLOAT_ENGINEERING_FORMATTER_OPTIONS,
    );

    this._dateTimeFormatter = new Intl.DateTimeFormat(this._settingsState.language, DATE_TIME_FORMATTER_OPTIONS);
  };

  private applyNumberFormatterParameters(value: number, formattedValue: string, parameters: IFormatterParameters) {
    let newFormattedValue = formattedValue;

    if (value < 0) {
      newFormattedValue = '-' + newFormattedValue;
    }

    if (value > 0 && parameters.alwaysShowSign) {
      newFormattedValue = '+' + newFormattedValue;
    }

    if (parameters.prefix) {
      newFormattedValue = parameters.prefix + newFormattedValue;
    }

    return newFormattedValue;
  }

  private checkIfLongFormatNeeded(absoluteValue: number) {
    return (
      (absoluteValue > 0 && absoluteValue < LONG_NUMBER_FORMATTER_MIN_THRESHOLD) ||
      absoluteValue >= LONG_NUMBER_FORMATTER_MAX_THRESHOLD
    );
  }

  private formatLongNumber(value: number, parameters: IFormatterParameters): string {
    let formattedValue = '';
    const absoluteValue = Math.abs(value);

    switch (this._settingsState.longNumberFormat) {
      case LongNumberFormat.short:
        formattedValue = this._floatShortFormatter.format(absoluteValue);
        break;

      case LongNumberFormat.long:
        formattedValue = this._floatLongFormatter.format(absoluteValue);
        break;

      case LongNumberFormat.scientific:
        formattedValue = this._floatScientificFormatter.format(absoluteValue);
        break;

      case LongNumberFormat.engineering:
        formattedValue = this._floatEngineeringFormatter.format(absoluteValue);
        break;
    }

    return this.applyNumberFormatterParameters(value, formattedValue, parameters);
  }
}
