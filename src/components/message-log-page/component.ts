import { html, css } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { GameStateAlert } from '@shared/types';
import { DELETE_VALUES, pageTitleStyle } from '@shared/styles';
import { MessageLogBarController } from './controller';

@localized()
@customElement('ca-message-log-page')
export class MessageLogPage extends BaseComponent {
  static styles = [
    pageTitleStyle,
    css`
      :host {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
      }

      h3.title {
        margin-bottom: var(--sl-spacing-large);
      }

      sl-divider {
        --spacing: var(--sl-spacing-large);
      }
    `,
  ];

  private _controller: MessageLogBarController;

  constructor() {
    super();

    this._controller = new MessageLogBarController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmClearMessagesDialog);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmClearMessagesDialog);
  }

  render() {
    return html`
      <h3 class="title">${msg('Message log')}</h3>

      <div>
        <sl-button
          id="clear-button"
          variant=${DELETE_VALUES.buttonVariant}
          size="medium"
          @click=${this.handleOpenClearMessagesDialog}
        >
          <sl-icon slot="prefix" name=${DELETE_VALUES.icon}></sl-icon>

          ${msg('Clear messages')}
        </sl-button>
      </div>

      <sl-divider></sl-divider>

      <ca-message-log-content></ca-message-log-content>
    `;
  }

  private handleOpenClearMessagesDialog = () => {
    this.dispatchEvent(
      new ConfirmationAlertOpenEvent(GameStateAlert.clearMessages, msg('Are you sure want to clear log messages?')),
    );
  };

  private handleConfirmClearMessagesDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== GameStateAlert.clearMessages) {
      return;
    }

    this._controller.clearMessages();
  };
}
