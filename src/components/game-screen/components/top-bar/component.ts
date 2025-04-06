import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { SCREEN_WIDTH_POINTS } from '@shared/styles';
import { MenuToggledEvent } from './events';

@localized()
@customElement('ca-top-bar')
export class TopBar extends BaseComponent {
  static styles = css`
    :host {
      display: flex;
      align-items: stretch;
      box-sizing: border-box;
      width: 100%;
    }

    .group {
      flex: 0 0 auto;
      font-size: var(--sl-font-size-large);
      line-height: var(--sl-line-height-denser);
      display: flex;
      align-items: center;
    }

    .menu-group {
      margin-right: var(--sl-spacing-large);
    }

    @media (min-width: ${SCREEN_WIDTH_POINTS.WIDE_SCREEN}) {
      .menu-group {
        display: none;
      }
    }

    sl-icon-button::part(base) {
      padding: var(--sl-spacing-small);
    }
  `;

  render() {
    return html`
      <div class="group menu-group">
        <sl-tooltip>
          <span slot="content"> ${msg('Toggle menu')} </span>

          <sl-icon-button name="list" label=${msg('Toggle menu')} @click=${this.handleMenuClick}>
          </sl-icon-button>
        </sl-tooltip>
      </div>

      <div class="group">
        <ca-game-speed-buttons></ca-game-speed-buttons>
      </div>
    `;
  }

  private handleMenuClick = () => {
    this.dispatchEvent(new MenuToggledEvent());
  };
}
