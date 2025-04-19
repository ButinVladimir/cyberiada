import { msg } from '@lit/localize';
import { Language, LongNumberFormat, Theme } from '@shared/types';

export const LANGUAGE_OPTIONS = [
  [Language.en, 'English'],
  [Language.ru, 'Русский'],
];

export const MESSAGE_LOG_SIZE_MIN = 1;
export const MESSAGE_LOG_SIZE_MAX = 100;
export const MESSAGE_LOG_SIZE_STEP = 1;

export const TOAST_DURATION_MIN = 0;
export const TOAST_DURATION_MAX = 60000;
export const TOAST_DURATION_STEP = 1000;

export const FPS_MIN = 1;
export const FPS_MAX = 120;
export const FPS_STEP = 1;

export const FAST_SPEED_MULTIPLIER_MIN = 2;
export const FAST_SPEED_MULTIPLIER_MAX = 100;
export const FAST_SPEED_MULTIPLIER_STEP = 1;

export const MAX_UPDATES_PER_FRAME_MIN = 1;
export const MAX_UPDATES_PER_FRAME_MAX = 100000000;
export const MAX_UPDATES_PER_FRAME_STEP = 1;

export const AUTOSAVE_INTERVAL_MIN = 0;
export const AUTOSAVE_INTERVAL_MAX = 600000;
export const AUTOSAVE_INTERVAL_STEP = 1000;

export const THEME_NAMES: Record<Theme, () => string> = {
  [Theme.light]: () => msg('Light theme'),
  [Theme.dark]: () => msg('Dark theme'),
};

export const LONG_NUMBER_FORMAT_NAMES: Record<LongNumberFormat, () => string> = {
  [LongNumberFormat.engineering]: () => msg('Engineering'),
  [LongNumberFormat.scientific]: () => msg('Scientific'),
  [LongNumberFormat.short]: () => msg('Short numbers'),
  [LongNumberFormat.long]: () => msg('Long numbers'),
};
