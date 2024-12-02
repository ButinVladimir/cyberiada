import { BaseController } from '@shared/base-controller';
import { MessageEvent } from '@shared/types';

export class MessageFilterDialogController extends BaseController {
  isMessageEventEnabled(event: MessageEvent): boolean {
    return this.settingsState.isMessageEventEnabled(event);
  }

  toggleMessageEvent(event: MessageEvent, enabled: boolean) {
    this.settingsState.toggleMessageEvent(event, enabled);
    this.handleRefreshUI();
  }
}
