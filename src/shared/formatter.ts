import i18n from 'i18next';
import { injectable, inject } from 'inversify';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { TYPES } from '@state/types';
import { IFormatter } from './interfaces/formatter';
import { LongNumberFormat } from './types';

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

@injectable()
export class Formatter implements IFormatter {
  private _settingsState: ISettingsState;

  private _decimalBuiltInFormatter: Intl.NumberFormat;
  private _floatBuiltInFormatter: Intl.NumberFormat;

  constructor(
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
  ) {
    this._settingsState = _settingsState;

    this._decimalBuiltInFormatter = new Intl.NumberFormat(navigator.language, { maximumFractionDigits: 0 });
    this._floatBuiltInFormatter = new Intl.NumberFormat(navigator.language, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    i18n.on('languageChanged', this.updateBuiltInFormatters);
  }

  formatTimeShort(time: number): string {
    let remainingTime = time;
    const result = [];

    for (const { units } of TIME_PARTS) {
      const value = Math.floor(remainingTime / units);
      remainingTime = remainingTime - value * units;

      result.push(value.toString().padStart(2, '0'));
    }

    return result.join(':');
  }

  formatNumberFloat(value: number): string {
    return this._floatBuiltInFormatter.format(value);
  }

  formatNumberDecimal(value: number): string {
    return this._decimalBuiltInFormatter.format(value);
  }

  formatNumberLong(value: number): string {
    switch (this._settingsState.longNumberFormat) {
      case LongNumberFormat.builtIn:
        return this.formatNumberFloat(value);

      case LongNumberFormat.scientific:
        return this.formatNumberExponential(value);
    }
  }

  formatQuality(value: number): string {
    if (value < 0) {
      return '0-';
    }

    if (value > 6) {
      return 'VII+';
    }

    return QUALITY_MAP[value];
  }

  private updateBuiltInFormatters = () => {
    this._decimalBuiltInFormatter = new Intl.NumberFormat(this._settingsState.language, { maximumFractionDigits: 0 });
    this._floatBuiltInFormatter = new Intl.NumberFormat(this._settingsState.language, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  private formatNumberExponential(value: number) {
    return value.toExponential(2);
  }
}

