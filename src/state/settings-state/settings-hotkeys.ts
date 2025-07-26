import constants from '@configs/constants.json';
import { Hotkey } from '@shared/index';
import { ISettingsHotkeys } from './interfaces';

export class SettingsHotkeys implements ISettingsHotkeys {
  private _hotkeyMap: Map<Hotkey, string>;
  private _keyMap: Map<string, Hotkey>;

  constructor() {
    this._hotkeyMap = new Map<Hotkey, string>();
    this._keyMap = new Map<string, Hotkey>();

    Object.entries(constants.defaultSettings.hotkeys).forEach(([hotkey, key]) => {
      const typedHotkey = hotkey as Hotkey;

      this._hotkeyMap.set(typedHotkey, key);
      this._keyMap.set(key, typedHotkey);
    });
  }

  getHotkeyByKey(key: string): Hotkey | undefined {
    return this._keyMap.get(key);
  }

  getKeyByHotkey(hotkey: Hotkey): string | undefined {
    return this._hotkeyMap.get(hotkey);
  }
}
