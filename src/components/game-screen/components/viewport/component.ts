import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OverviewMenuItem, MiscMenuItem } from '@shared/types';

@customElement('ca-viewport')
export class Viewport extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: var(--ca-max-content-width);
    }
  `

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
