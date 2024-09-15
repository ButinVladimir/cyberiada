import { t } from 'i18next';
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { MessageLogBarController } from './controller';

@customElement('ca-message-log-bar')
export class MessageLogBar extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
    }

    div.title-bar div.gutter {
      flex: 1 1 auto;
    }

    div.title-bar {
      flex: 0;
      display: flex;
      align-items: flex-start;
      padding: var(--sl-spacing-small);
      border-bottom: var(--ca-border);
      height: var(--ca-message-log-top-bar);
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: 0;
      line-height: var(--sl-line-height-denser);
      flex: 1 1 auto;
    }

    sl-icon-button {
      font-size: var(--sl-font-size-large);
      line-height: var(--sl-line-height-denser);
      margin-top: -0.3em;
      flex: 0 0 auto;
    }

    sl-icon-button#clear-messages-btn::part(base):hover {
      color: var(--sl-color-danger-600);
    }

    ca-message-log-content {
      flex: 1 1 auto;
      width: 100%;
      height: calc(100vh - var(--ca-message-log-top-bar) - var(--ca-top-bar-height) - var(--ca-top-bar-gutter));
    }
  `;

  private _messageLogBarController: MessageLogBarController;

  constructor() {
    super();

    this._messageLogBarController = new MessageLogBarController(this);
  }

  @state()
  private _isMessageFilterOpen = false;

  render() {
    return html`
      <div class="title-bar">
        <h4 class="title">
          <intl-message label="ui:messageLog:messageLog">Message log</intl-message>
        </h4>

        <div class="gutter"></div>

        <sl-icon-button
          id="clear-messages-btn"
          name="x-circle"
          label=${t('messageLog.clearMessages', { ns: 'ui' })}
          @click=${this.handleClearMessages}
        >
        </sl-icon-button>

        <sl-icon-button
          id="message-filter-btn"
          name="gear"
          label=${t('messageLog.messageFilter', { ns: 'ui' })}
          @click=${this.handleMessageFilterDialogOpen}
        >
        </sl-icon-button>

        <ca-message-filter-dialog
          ?is-open=${this._isMessageFilterOpen}
          @message-filter-dialog-close=${this.handleMessageFilterDialogClose}
        >
        </ca-message-filter-dialog>
      </div>

      <ca-message-log-content></ca-message-log-content>
    `;
  }

  private handleMessageFilterDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isMessageFilterOpen = true;
  };

  private handleMessageFilterDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isMessageFilterOpen = false;
  };

  private handleClearMessages = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._messageLogBarController.clearMessages();
  };
}
