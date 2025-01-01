import { t } from 'i18next';
import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { MenuToggledEvent } from './events';

@customElement('ca-top-bar')
export class TopBar extends BaseComponent {
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

  renderContent() {
    return html`
      <div class="group">
        <sl-tooltip>
          <span slot="content"> ${t('topBar.menu', { ns: 'ui' })} </span>

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
        <ca-top-bar-available-goals></ca-top-bar-available-goals>
      </div>
    `;
  }

  private handleMenuClick = () => {
    this.dispatchEvent(new MenuToggledEvent());
  };
}
