import { EventEmitter } from 'eventemitter3';
import { Language, Theme } from '@shared/constants';

export interface ISettingsFormValues {
  language: Language;
  theme: Theme;
}

export interface ISettingsState {
  eventEmitter: EventEmitter;
  language: Language;
  theme: Theme;
  applyFormValues(values: ISettingsFormValues): void;
}
