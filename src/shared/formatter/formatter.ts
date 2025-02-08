import i18n from 'i18next';
import { injectable, inject } from 'inversify';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { TYPES } from '@state/types';
import { LongNumberFormat } from '../types';
import { IFormatterParameters, IFormatter } from '../interfaces';
import {
  QUALITY_MAP,
  TIME_PARTS,
  DATE_TIME_FORMATTER_OPTIONS,
  DEFAULT_NUMBER_DECIMAL_FORMAT_PARAMETERS,
  DEFAULT_NUMBER_FLOAT_FORMAT_PARAMETERS,
  DEFAULT_NUMBER_QUALITY_FORMAT_PARAMETERS,
  DEFAULT_TIME_SHORT_FORMAT_PARAMETERS,
  DECIMAL_LONG_FORMATTER_OPTIONS,
  FLOAT_SHORT_FORMATTER_OPTIONS,
  FLOAT_LONG_FORMATTER_OPTIONS,
  FLOAT_SCIENTIFIC_FORMATTER_OPTIONS,
  FLOAT_ENGINEERING_FORMATTER_OPTIONS,
  LONG_NUMBER_FORMATTER_MAX_THRESHOLD,
  LONG_NUMBER_FORMATTER_MIN_THRESHOLD,
} from './constants';

@injectable()
export class Formatter implements IFormatter {
  private _settingsState: ISettingsState;

  private _decimalLongFormatter!: Intl.NumberFormat;
  private _floatLongFormatter!: Intl.NumberFormat;
  private _floatShortFormatter!: Intl.NumberFormat;
  private _floatScientificFormatter!: Intl.NumberFormat;
  private _floatEngineeringFormatter!: Intl.NumberFormat;
  private _dateTimeFormatter!: Intl.DateTimeFormat;

  constructor(@inject(TYPES.SettingsState) _settingsState: ISettingsState) {
    this._settingsState = _settingsState;

    this.updateBuiltInFormatters();

    i18n.on('languageChanged', this.updateBuiltInFormatters);
  }

  formatTimeShort(time: number, parameters: IFormatterParameters = DEFAULT_TIME_SHORT_FORMAT_PARAMETERS): string {
    let remainingTime = Math.abs(time);
    const result = [];

    for (const { units } of TIME_PARTS) {
      const value = Math.floor(remainingTime / units);
      remainingTime = remainingTime - value * units;

      result.push(value.toString().padStart(2, '0'));
    }

    const formattedTime = result.join(':');

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

  formatQuality(value: number, parameters: IFormatterParameters = DEFAULT_NUMBER_QUALITY_FORMAT_PARAMETERS): string {
    let formattedValue = '';

    if (value < 0) {
      formattedValue = '0';
    } else if (value > 6) {
      formattedValue = 'VII+';
    } else {
      formattedValue = QUALITY_MAP[value];
    }

    return this.applyNumberFormatterParameters(value, formattedValue, parameters);
  }

  formatDateTime(value: Date): string {
    return this._dateTimeFormatter.format(value);
  }

  private updateBuiltInFormatters = () => {
    this._decimalLongFormatter = new Intl.NumberFormat(i18n.language, DECIMAL_LONG_FORMATTER_OPTIONS);

    this._floatLongFormatter = new Intl.NumberFormat(i18n.language, FLOAT_LONG_FORMATTER_OPTIONS);

    this._floatShortFormatter = new Intl.NumberFormat(i18n.language, FLOAT_SHORT_FORMATTER_OPTIONS);

    this._floatScientificFormatter = new Intl.NumberFormat(i18n.language, FLOAT_SCIENTIFIC_FORMATTER_OPTIONS);

    this._floatEngineeringFormatter = new Intl.NumberFormat(i18n.language, FLOAT_ENGINEERING_FORMATTER_OPTIONS);

    this._dateTimeFormatter = new Intl.DateTimeFormat(i18n.language, DATE_TIME_FORMATTER_OPTIONS);
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
