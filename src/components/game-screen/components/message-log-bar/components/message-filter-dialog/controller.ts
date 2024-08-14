import { BaseController } from '@shared/base-controller';
import { MessageFilterEvent } from '@shared/types';

export class MessageFilterDialogController extends BaseController {
  isMessageFilterEventEnabled(event: MessageFilterEvent): boolean {
    return this.settingsState.isMessageFilterEventEnabled(event);
  }

  toggleMessageFilterEvent(event: MessageFilterEvent, enabled: boolean) {
    this.settingsState.toggleMessageFilterEvent(event, enabled);
    this.host.requestUpdate();
  }
}
