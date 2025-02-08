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

export const DEFAULT_TIME_SHORT_FORMAT_PARAMETERS: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

export const DEFAULT_NUMBER_FLOAT_FORMAT_PARAMETERS: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

export const DEFAULT_NUMBER_DECIMAL_FORMAT_PARAMETERS: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

export const DEFAULT_NUMBER_QUALITY_FORMAT_PARAMETERS: IFormatterParameters = {
  alwaysShowSign: false,
  prefix: '',
};

export const DECIMAL_LONG_FORMATTER_OPTIONS: Intl.NumberFormatOptions = {
  maximumFractionDigits: 0,
};

export const FLOAT_LONG_FORMATTER_OPTIONS: Intl.NumberFormatOptions = {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
};

export const FLOAT_SHORT_FORMATTER_OPTIONS: Intl.NumberFormatOptions = {
  notation: 'compact',
  compactDisplay: 'short',
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
};

export const FLOAT_SCIENTIFIC_FORMATTER_OPTIONS: Intl.NumberFormatOptions = {
  notation: 'scientific',
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
};

export const FLOAT_ENGINEERING_FORMATTER_OPTIONS: Intl.NumberFormatOptions = {
  notation: 'engineering',
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
};

export const DATE_TIME_FORMATTER_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

export const LONG_NUMBER_FORMATTER_MAX_THRESHOLD = 1000;
export const LONG_NUMBER_FORMATTER_MIN_THRESHOLD = 0.001;
