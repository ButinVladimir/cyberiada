import { IFormatterParameters } from '../interfaces';

export const TIME_PARTS = [
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

export const QUALITY_MAP: Record<number, string> = {
  0: 'I',
  1: 'II',
  2: 'III',
  3: 'IV',
  4: 'V',
  5: 'VI',
  6: 'VII',
};

export const defaultTimeShortFormatParameters: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

export const defaultNumberFloatFormatParameters: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

export const defaultNumberDecimalFormatParameters: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

export const defaultNumberQualityFormatParameters: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

export const decimalLongFormatterOptions: Intl.NumberFormatOptions = {
  maximumFractionDigits: 0,
};

export const floatLongFormatterOptions: Intl.NumberFormatOptions = {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
};

export const floatShortFormatterOptions: Intl.NumberFormatOptions = {
  notation: 'compact',
  compactDisplay: 'short',
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
};

export const floatScientificFormatterOptions: Intl.NumberFormatOptions = {
  notation: 'scientific',
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
};

export const floatEngineeringFormatterOptions: Intl.NumberFormatOptions = {
  notation: 'engineering',
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
};

export const dateTimeFormatterOptions: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

export const longNumberFormatterMaxThreshold = 1000;
export const longNumberFormatterMinThreshold = 0.001;
