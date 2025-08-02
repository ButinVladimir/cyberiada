import constants from '@configs/constants.json';
import { TYPES } from '@state/types';
import { decorators } from '@state/container';
import { Hotkey } from '@shared/index';
import { ISettingsHotkeys } from './interfaces';
import { SettingsHotkeysSerializedState } from './serialized-states';
import { type IStateUIConnector } from '../state-ui-connector';

const { lazyInject } = decorators;

export class SettingsHotkeys implements ISettingsHotkeys {
  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  private _hotkeyMap: Map<Hotkey, string>;
  private _keyMap: Map<string, Hotkey>;

  constructor() {
    this._hotkeyMap = new Map<Hotkey, string>();
    this._keyMap = new Map<string, Hotkey>();

    this._stateUiConnector.registerEventEmitter(this, ['_keyMap', '_hotkeyMap']);
  }

  getHotkeyByKey(key: string): Hotkey | undefined {
    const convertedKey = this.convertKey(key);

    return this._keyMap.get(convertedKey);
  }

  getKeyByHotkey(hotkey: Hotkey): string | undefined {
    return this._hotkeyMap.get(hotkey);
  }

  setHotkey(hotkey: Hotkey, key: string) {
    const convertedKey = this.convertKey(key);
    const existingHotkey = this.getHotkeyByKey(convertedKey);

    if (existingHotkey) {
      this._hotkeyMap.delete(existingHotkey);
    }

    const existingKey = this.getKeyByHotkey(hotkey);

    if (existingKey) {
      this._keyMap.delete(existingKey);
    }

    this._hotkeyMap.set(hotkey, convertedKey);
    this._keyMap.set(convertedKey, hotkey);
  }

  clearHotkeys() {
    this._hotkeyMap.clear();
    this._keyMap.clear();
  }

  async startNewState(): Promise<void> {
    this.restoreHotkeys(constants.defaultSettings.hotkeys);
  }

  async deserialize(serializedState: SettingsHotkeysSerializedState): Promise<void> {
    this.restoreHotkeys(serializedState);
  }

  serialize(): SettingsHotkeysSerializedState {
    return Object.fromEntries(this._hotkeyMap.entries()) as SettingsHotkeysSerializedState;
  }

  private restoreHotkeys(hotkeysState: SettingsHotkeysSerializedState) {
    this.clearHotkeys();

    Object.entries(hotkeysState).forEach(([hotkey, key]) => {
      const typedHotkey = hotkey as Hotkey;
      const convertedKey = this.convertKey(key);

      this._hotkeyMap.set(typedHotkey, convertedKey);
      this._keyMap.set(convertedKey, typedHotkey);
    });
  }

  private convertKey(key: string): string {
    return key.toLocaleLowerCase();
  }
}
