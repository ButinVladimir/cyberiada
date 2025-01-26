import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import constants from '@configs/constants.json';
import { BaseComponent } from '@shared/base-component';
import { OVERVIEW_MENU_ITEMS, MISC_MENU_ITEMS } from '@shared/constants';
import { Feature } from '@shared/types';
import { MenuBarController } from './controller';

@customElement('ca-menu-bar')
export class MenuBar extends BaseComponent<MenuBarController> {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    scrollable-component {
      width: 100%;
      height: 100%;
      --scrollbar-width: var(--ca-scrollbar-width);
      --scrollbar-thumb-fill-color: var(--ca-scrollbar-thumb-fill-color);
      --scrollbar-thumb-fill-color-hover: var(--ca-scrollbar-thumb-fill-color-hover);
    }

    nav {
      box-sizing: border-box;
      padding: var(--sl-spacing-2x-small);
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    sl-divider {
      --spacing: var(--sl-spacing-2x-small);
    }
  `;

  @property({ attribute: 'selected-menu-item', type: String })
  selectedMenuItem?: string;

  protected controller: MenuBarController;

  constructor() {
    super();

    this.controller = new MenuBarController(this);
  }

  renderContent() {
    return html`
      <scrollable-component>
        <nav>
          <ca-menu-bar-values></ca-menu-bar-values>

          <sl-divider></sl-divider>

          ${OVERVIEW_MENU_ITEMS.map(this.renderMenuItem)}

          <sl-divider></sl-divider>

          ${MISC_MENU_ITEMS.map(this.renderMenuItem)}
        </nav>
      </scrollable-component>
    `;
  }

  private renderMenuItem = (menuItem: string) => {
    const requirements = constants.menuUnlockRequirements as Record<string, Feature>;
    const feature = requirements[menuItem] as Feature | undefined;

    if (feature && !this.controller.isFeatureUnlocked(feature)) {
      return null;
    }

    return html`
      <ca-menu-item key=${menuItem} name=${menuItem} ?selected=${this.selectedMenuItem === menuItem}> </ca-menu-item>
    `;
  };
}
