import i18n from 'i18next';
import { injectable, inject } from 'inversify';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { TYPES } from '@state/types';
import { LongNumberFormat } from '../types';
import { IFormatterParameters, IFormatter } from '../interfaces';
import {
  QUALITY_MAP,
  TIME_PARTS,
  dateTimeFormatterOptions,
  defaultNumberDecimalFormatParameters,
  defaultNumberFloatFormatParameters,
  defaultNumberQualityFormatParameters,
  defaultTimeShortFormatParameters,
  decimalLongFormatterOptions,
  floatShortFormatterOptions,
  floatLongFormatterOptions,
  floatScientificFormatterOptions,
  floatEngineeringFormatterOptions,
  longNumberFormatterMaxThreshold,
  longNumberFormatterMinThreshold,
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

  formatTimeShort(time: number, parameters: IFormatterParameters = defaultTimeShortFormatParameters): string {
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

  formatNumberFloat(value: number, parameters: IFormatterParameters = defaultNumberFloatFormatParameters): string {
    const absoluteValue = Math.abs(value);
    const isLongValue = this.checkIfLongFormatNeeded(absoluteValue);

    if (!isLongValue) {
      const formattedValue = this._floatLongFormatter.format(absoluteValue);

      return this.applyNumberFormatterParameters(value, formattedValue, parameters);
    }

    return this.formatLongNumber(value, parameters);
  }

  formatNumberDecimal(value: number, parameters: IFormatterParameters = defaultNumberDecimalFormatParameters): string {
    const absoluteValue = Math.abs(value);
    const isLongValue = this.checkIfLongFormatNeeded(absoluteValue);

    if (!isLongValue) {
      const formattedValue = this._decimalLongFormatter.format(absoluteValue);

      return this.applyNumberFormatterParameters(value, formattedValue, parameters);
    }

    return this.formatLongNumber(value, parameters);
  }

  formatQuality(value: number, parameters: IFormatterParameters = defaultNumberQualityFormatParameters): string {
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
    this._decimalLongFormatter = new Intl.NumberFormat(i18n.language, decimalLongFormatterOptions);

    this._floatLongFormatter = new Intl.NumberFormat(i18n.language, floatLongFormatterOptions);

    this._floatShortFormatter = new Intl.NumberFormat(i18n.language, floatShortFormatterOptions);

    this._floatScientificFormatter = new Intl.NumberFormat(i18n.language, floatScientificFormatterOptions);

    this._floatEngineeringFormatter = new Intl.NumberFormat(i18n.language, floatEngineeringFormatterOptions);

    this._dateTimeFormatter = new Intl.DateTimeFormat(i18n.language, dateTimeFormatterOptions);
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
      (absoluteValue > 0 && absoluteValue < longNumberFormatterMinThreshold) ||
      absoluteValue >= longNumberFormatterMaxThreshold
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
