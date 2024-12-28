import i18n from 'i18next';
import { injectable, inject } from 'inversify';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { TYPES } from '@state/types';
import { LongNumberFormat } from './types';
import { IFormatterParameters, IFormatter } from './interfaces';

const TIME_PARTS = [
  {
    units: 24 * 60 * 60 * 1000,
  },
  {
    units: 60 * 60 * 1000,
  },
  {
    units: 60 * 1000,
  },
  {
    units: 1000,
  },
];

const QUALITY_MAP: Record<number, string> = {
  0: 'I',
  1: 'II',
  2: 'III',
  3: 'IV',
  4: 'V',
  5: 'VI',
  6: 'VII',
};

const defaultTimeShortFormatParameters: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

const defaultNumberFloatFormatParameters: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

const defaultNumberDecimalFormatParameters: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

const defaultNumberLongFormatParameters: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

const defaultNumberQualityFormatParameters: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

const longNumberFormatterThreshold = 1000;

@injectable()
export class Formatter implements IFormatter {
  private _settingsState: ISettingsState;

  private _decimalBuiltInFormatter: Intl.NumberFormat;
  private _floatBuiltInFormatter: Intl.NumberFormat;

  constructor(@inject(TYPES.SettingsState) _settingsState: ISettingsState) {
    this._settingsState = _settingsState;

    this._decimalBuiltInFormatter = new Intl.NumberFormat(navigator.language, { maximumFractionDigits: 0 });
    this._floatBuiltInFormatter = new Intl.NumberFormat(navigator.language, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

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
    const formattedValue = this._floatBuiltInFormatter.format(Math.abs(value));

    return this.applyNumberFormatterParameters(value, formattedValue, parameters);
  }

  formatNumberDecimal(value: number, parameters: IFormatterParameters = defaultNumberDecimalFormatParameters): string {
    const formattedValue = this._decimalBuiltInFormatter.format(Math.abs(value));

    return this.applyNumberFormatterParameters(value, formattedValue, parameters);
  }

  formatNumberLong(value: number, parameters: IFormatterParameters = defaultNumberLongFormatParameters): string {
    let formattedValue = '';
    const absoluteValue = Math.abs(value);

    if (absoluteValue < longNumberFormatterThreshold) {
      formattedValue = this.formatNumberFloat(absoluteValue);

      return this.applyNumberFormatterParameters(value, formattedValue, parameters);
    }

    switch (this._settingsState.longNumberFormat) {
      case LongNumberFormat.builtIn:
        formattedValue = this.formatNumberFloat(absoluteValue);
        break;

      case LongNumberFormat.scientific:
        formattedValue = this.formatNumberExponential(absoluteValue);
        break;
    }

    return this.applyNumberFormatterParameters(value, formattedValue, parameters);
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

  private updateBuiltInFormatters = () => {
    this._decimalBuiltInFormatter = new Intl.NumberFormat(this._settingsState.language, { maximumFractionDigits: 0 });
    this._floatBuiltInFormatter = new Intl.NumberFormat(this._settingsState.language, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  };

  private formatNumberExponential(value: number) {
    return value.toExponential(3);
  }

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
}
