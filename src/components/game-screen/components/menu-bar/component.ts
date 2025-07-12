import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import constants from '@configs/constants.json';
import { BaseComponent } from '@shared/base-component';
import { OVERVIEW_MENU_ITEMS, MISC_MENU_ITEMS } from '@shared/constants';
import { Feature } from '@shared/types';
import { MenuBarController } from './controller';
import styles from './styles';

@customElement('ca-menu-bar')
export class MenuBar extends BaseComponent {
  static styles = styles;

  @property({ attribute: 'selected-menu-item', type: String })
  selectedMenuItem?: string;

  private _controller: MenuBarController;

  constructor() {
    super();

    this._controller = new MenuBarController(this);
  }

  protected renderDesktop() {
    return html`
      <aside>
        <ca-menu-bar-values></ca-menu-bar-values>

        <sl-divider></sl-divider>

        <nav>
          ${OVERVIEW_MENU_ITEMS.map(this.renderMenuItem)}

          <sl-divider></sl-divider>

          ${MISC_MENU_ITEMS.map(this.renderMenuItem)}
        </nav>
      </aside>
    `;
  }

  private renderMenuItem = (menuItem: string) => {
    const requirements = constants.menuUnlockRequirements as Record<string, Feature>;
    const feature = requirements[menuItem] as Feature | undefined;

    if (feature && !this._controller.isFeatureUnlocked(feature)) {
      return nothing;
    }

    return html`
      <ca-menu-item key=${menuItem} name=${menuItem} ?selected=${this.selectedMenuItem === menuItem}> </ca-menu-item>
    `;
  };
}
