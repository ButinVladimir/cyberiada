import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cache } from 'lit/directives/cache.js';
import { OverviewMenuItem, MiscMenuItem } from '@shared/constants';

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
        return cache(html`<ca-city-page></ca-city-page>`);
      case MiscMenuItem.settings:
        return cache(html`<ca-settings-page></ca-settings-page>`);
      default:
        return null;
    }
  }
}
