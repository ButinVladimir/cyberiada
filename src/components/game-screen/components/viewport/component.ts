import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OverviewMenuItem, MiscMenuItem } from '@shared/types';

@customElement('ca-viewport')
export class Viewport extends LitElement {
  @property({
    attribute: 'selected-menu-item',
    type: String,
  })
  selectedMenuItem = '';

  render() {
    switch (this.selectedMenuItem) {
      case OverviewMenuItem.cityOverview:
        return html`<ca-city-page></ca-city-page>`;
      case OverviewMenuItem.mainframe:
        return html`<ca-mainframe-page></ca-mainframe-page>`;
      case MiscMenuItem.settings:
        return html`<ca-settings-page></ca-settings-page>`;
      default:
        return null;
    }
  }
}
