import { t } from 'i18next';
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MenuToggledEvent, LogsToggledEvent } from './events';

@customElement('ca-top-bar')
export class TopBar extends LitElement {
  static styles = css`
    :host {
      display: flex;
      box-sizing: border-box;
      width: 100%;
    }

    .icons-group {
      flex: 0 0 auto;
      font-size: var(--sl-font-size-large);
      line-height: var(--sl-line-height-denser);
    }

    .icons-group:first-child {
      margin-right: var(--sl-spacing-medium);
    }

    .gutter {
      flex: 1 1 auto;
    }
  `;

  render() {
    return html`
      <span class="icons-group">
        <sl-tooltip @click=${this.handleMenuClick}>
          <intl-message slot="content" label="ui:topBar:menu"> Menu </intl-message>

          <sl-icon-button name="list" label=${t('topBar.menu', { ns: 'ui' })}> </sl-icon-button>
        </sl-tooltip>
      </span>

      <span class="gutter"></span>

      <span class="icons-group">
        <sl-tooltip @click=${this.handleLogsClick}>
          <intl-message slot="content" label="ui:topBar:messageLog"> Message log </intl-message>

          <sl-icon-button name="chat-left-dots" label=${t('topBar.messageLog', { ns: 'ui' })}> </sl-icon-button>
        </sl-tooltip>
      </span>
    `;
  }

  private handleMenuClick = () => {
    this.dispatchEvent(new MenuToggledEvent());
  };

  private handleLogsClick = () => {
    this.dispatchEvent(new LogsToggledEvent());
  };
}
