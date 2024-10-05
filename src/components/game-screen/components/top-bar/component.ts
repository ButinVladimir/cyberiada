import { t } from 'i18next';
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MenuToggledEvent, LogsToggledEvent } from './events';

@customElement('ca-top-bar')
export class TopBar extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: stretch;
      box-sizing: border-box;
      width: 100%;
      gap: var(--sl-spacing-2x-large);
    }

    .group {
      flex: 0 0 auto;
      font-size: var(--sl-font-size-large);
      line-height: var(--sl-line-height-denser);
    }

    .gutter {
      flex: 1 1 auto;
    }
  `;

  render() {
    return html`
      <div class="group">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:menu">
            Menu
          </intl-message>

          <sl-icon-button name="list" label=${t('topBar.menu', { ns: 'ui' })} @click=${this.handleMenuClick}>
          </sl-icon-button>
        </sl-tooltip>
      </div>

      <div class="group">
        <ca-game-speed-buttons></ca-game-speed-buttons>
      </div>

      <div class="group">
        <ca-top-bar-values></ca-top-bar-values>
      </div>

      <div class="gutter"></div>

      <div class="group">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:messageLog">
            Message log
          </intl-message>

          <sl-icon-button
            name="chat-left-dots"
            label=${t('topBar.messageLog', { ns: 'ui' })}
            @click=${this.handleLogsClick}
          >
          </sl-icon-button>
        </sl-tooltip>
      </div>
    `;
  }

  private handleMenuClick = () => {
    this.dispatchEvent(new MenuToggledEvent());
  };

  private handleLogsClick = () => {
    this.dispatchEvent(new LogsToggledEvent());
  };
}
