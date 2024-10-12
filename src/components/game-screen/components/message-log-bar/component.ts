import { t } from 'i18next';
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
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
      height: calc(100vh - var(--ca-message-log-top-bar) - var(--ca-top-bar-height));
    }
  `;

  private _messageLogBarController: MessageLogBarController;

  constructor() {
    super();

    this._messageLogBarController = new MessageLogBarController(this);
  }

  render() {
    return html`
      <div class="title-bar">
        <h4 class="title">
          <intl-message label="ui:messageLog:messageLog">Message log</intl-message>
        </h4>

        <div class="gutter"></div>

        <sl-tooltip>
          <intl-message slot="content" label="ui:messageLog:clearMessages"> Clear messages </intl-message>

          <sl-icon-button
            id="clear-messages-btn"
            name="x-circle"
            label=${t('messageLog.clearMessages', { ns: 'ui' })}
            @click=${this.handleClearMessages}
          >
          </sl-icon-button>
        </sl-tooltip>
      </div>

      <ca-message-log-content></ca-message-log-content>
    `;
  }

  private handleClearMessages = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._messageLogBarController.clearMessages();
  };
}
