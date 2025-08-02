import { BaseController, Hotkey } from '@shared/index';

export class HotkeysDialogController extends BaseController {
  getKeyByHotkey(hotkey: Hotkey): string | undefined {
    return this.settingsState.hotkeys.getKeyByHotkey(hotkey);
  }

  setHotkey(hotkey: Hotkey, key: string) {
    this.settingsState.hotkeys.setHotkey(hotkey, key);
    this.host.requestUpdate();
  }

  clearHotkeys() {
    this.settingsState.hotkeys.clearHotkeys();
    this.host.requestUpdate();
  }
}
