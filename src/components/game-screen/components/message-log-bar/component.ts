import { t } from 'i18next';
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('ca-message-log-bar')
export class MessageLogBar extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      box-sizing: border-box;
      padding: var(--sl-spacing-small);
    }

    div.title-bar div.gutter {
      flex: 1 1 auto;
    }

    div.title-bar {
      display: flex;
      align-items: flex-start;
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: 0;
      line-height: var(--sl-line-height-denser);
      flex: 0 0 auto;
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
  `;

  @state()
  private _isMessageFilterOpen = false;

  render() {
    return html`
      <div class="title-bar">
        <h4 class="title">
          <intl-message label="ui:messageLog:messageLog">Message log</intl-message>
        </h4>

        <div class="gutter"></div>

        <sl-tooltip>
          <intl-message slot="content" label="ui:messageLog:clearMessages">Clear messages</intl-message>
          <sl-icon-button id="clear-messages-btn" name="x-circle" label=${t('messageLog.clearMessages', { ns: 'ui' })}>
          </sl-icon-button>
        </sl-tooltip>

        <sl-tooltip>
          <intl-message slot="content" label="ui:messageLog:messageFilter">Message filter</intl-message>
          <sl-icon-button
            id="message-filter-btn"
            name="gear"
            label=${t('messageLog.messageFilter', { ns: 'ui' })}
            @click=${this.handleMessageFilterDialogOpen}
          >
          </sl-icon-button>
        </sl-tooltip>

        <ca-message-filter-dialog
          ?is-open=${this._isMessageFilterOpen}
          @message-filter-dialog-close=${this.handleMessageFilterDialogClose}
        >
        </ca-message-filter-dialog>
      </div>
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
}
