import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseComponent } from '@shared/index';
import { MenuToggledEvent } from './events';
import styles from './styles';

@localized()
@customElement('ca-top-bar')
export class TopBar extends BaseComponent {
  static styles = styles;

  protected hasMobileRender = true;
  protected hasTabletRender = true;

  protected renderDesktop() {
    return this.renderButtons();
  }

  protected renderMobile() {
    return this.renderBarWithMenu();
  }

  protected renderTablet() {
    return this.renderBarWithMenu();
  }

  private renderBarWithMenu = () => {
    return html`
      <div class="group menu-group">
        <sl-tooltip>
          <span slot="content"> ${msg('Toggle menu')} </span>

          <sl-icon-button name="list" label=${msg('Toggle menu')} @click=${this.handleMenuClick}> </sl-icon-button>
        </sl-tooltip>
      </div>

      ${this.renderButtons()}
    `;
  }

  private renderButtons = () => {
    return html`
      <div class="group">
        <ca-game-speed-buttons></ca-game-speed-buttons>
      </div>
    `;
  }

  private handleMenuClick = () => {
    this.dispatchEvent(new MenuToggledEvent());
  };
}
