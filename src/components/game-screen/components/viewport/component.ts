import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MiscMenuItem } from '@shared/constants';

@customElement('ca-viewport')
export class Viewport extends LitElement {
  @property({
    attribute: true,
    type: String
  })
  selectedMenuItem = '';

  render() {
    switch (this.selectedMenuItem) {
      case MiscMenuItem.settings:
        return html`<ca-settings-page></ca-settings-page>`;
      default:
        return null;
    }
  }
}
