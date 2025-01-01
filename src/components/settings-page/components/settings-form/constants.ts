import { Language } from '@shared/types';

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

export const UPDATE_INTERVAL_MIN = 25;
export const UPDATE_INTERVAL_MAX = 1000;
export const UPDATE_INTERVAL_STEP = 1;

export const FAST_SPEED_MULTIPLIER_MIN = 2;
export const FAST_SPEED_MULTIPLIER_MAX = 100;
export const FAST_SPEED_MULTIPLIER_STEP = 1;

export const MAX_UPDATES_PER_TICK_MIN = 1;
export const MAX_UPDATES_PER_TICK_MAX = 100000000;
export const MAX_UPDATES_PER_TICK_STEP = 1;

export const AUTOSAVE_INTERVAL_MIN = 10000;
export const AUTOSAVE_INTERVAL_MAX = 600000;
export const AUTOSAVE_INTERVAL_STEP = 1000;
