import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';

@customElement('ca-city-page')
export class CityPage extends BaseComponent {
  static styles = css``;

  renderContent() {
    return html`<ca-city-overview></ca-city-overview>`;
  }
}
