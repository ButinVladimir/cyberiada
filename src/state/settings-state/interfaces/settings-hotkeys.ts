import { Hotkey } from '@shared/index';

export interface ISettingsHotkeys {
  getHotkeyByKey(key: string): Hotkey | undefined;
  getKeyByHotkey(hotkey: Hotkey): string | undefined;
}
