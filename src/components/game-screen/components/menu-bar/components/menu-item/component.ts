import { html } from 'lit';
import { localized } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseComponent } from '@shared/base-component';
import { MiscMenuItem, OverviewMenuItem } from '@shared/types';
import { MenuItemSelectedEvent } from '../../events/menu-item-selected-event';
import { MENU_ITEMS } from './constants';
import styles from './styles';

@localized()
@customElement('ca-menu-item')
export class MenuItem extends BaseComponent {
  static styles = styles;

  @property({
    attribute: true,
    type: String,
  })
  name = '';

  @property({
    attribute: true,
    type: Boolean,
  })
  selected = false;

  protected renderDesktop() {
    const classes = classMap({
      selected: this.selected,
    });

    return html`
      <button type="button" class=${classes} @click=${this.handleClick}>
        ${MENU_ITEMS[this.name as OverviewMenuItem | MiscMenuItem]()}
      </button>
    `;
  }

  private handleClick = () => {
    this.dispatchEvent(new MenuItemSelectedEvent(this.name));
  };
}
