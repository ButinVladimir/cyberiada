import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { overviewMenuItems, miscMenuItems } from '@shared/constants';
import { MenuItem } from './components/menu-item/component';
import { MenuItemSelectedEvent } from './events/menu-item-selected-event';

@customElement('ca-menu-bar')
export class MenuBar extends LitElement {
  static styles = css`
    :host {
      width: 100%;      
      box-sizing: border-box;
      padding: var(--sl-spacing-2x-small);
    }

    nav {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    sl-divider {
      --spacing: var(--sl-spacing-2x-small);
    }
  `;

  @property({ attribute: true, type: String })
  selectedMenuItem = '';

  render() {
    return html`
      <nav>
        ${overviewMenuItems.map(this.renderMenuItem)}

        <sl-divider></sl-divider>

        ${miscMenuItems.map(this.renderMenuItem)}
      </nav>
    `;
  }

  private renderMenuItem = (menuItem: string) => {
    return html`
      <ca-menu-item
        key=${menuItem}
        name=${menuItem}
        ?selected=${this.selectedMenuItem === menuItem}
        @click=${this.handleMenuItemClick}
      >
      </ca-menu-item>
    `;
  };

  private handleMenuItemClick = (event: Event) => {
    event.stopPropagation();

    const target = event.target as MenuItem;
    const menuItemName = target.getAttribute('name') ?? '';

    this.dispatchEvent(new MenuItemSelectedEvent(menuItemName));
  };
}
