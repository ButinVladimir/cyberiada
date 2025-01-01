import { t } from 'i18next';
import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@/components/shared/confirmation-alert/events';
import { GameStateAlert } from '@shared/types';
import { MessageLogBarController } from './controller';

@customElement('ca-message-log-page')
export class MessageLogPage extends BaseComponent<MessageLogBarController> {
  static styles = css`
    :host {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
      line-height: var(--sl-line-height-denser);
    }

    sl-divider {
      --spacing: var(--sl-spacing-large);
    }
  `;

  protected controller: MessageLogBarController;

  constructor() {
    super();

    this.controller = new MessageLogBarController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmClearMessagesDialog);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmClearMessagesDialog);
  }

  renderContent() {
    return html`
      <h3 class="title">${t('messageLog.messageLog', { ns: 'ui' })}</h3>

      <div>
        <sl-button variant="danger" size="medium" @click=${this.handleOpenClearMessagesDialog}>
          ${t('messageLog.clearMessages', { ns: 'ui' })}
        </sl-button>
      </div>

      <sl-divider></sl-divider>

      <ca-message-log-content></ca-message-log-content>
    `;
  }

  private handleOpenClearMessagesDialog = (event: Event) => {
    event.stopPropagation();

    this.dispatchEvent(new ConfirmationAlertOpenEvent(GameStateAlert.clearMessages, {}));
  };

  private handleConfirmClearMessagesDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== GameStateAlert.clearMessages) {
      return;
    }

    this.controller.clearMessages();
  };
}
