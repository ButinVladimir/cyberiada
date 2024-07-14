import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ca-city-page')
export class CityPage extends LitElement {
  static styles = css``;

  render() {
    return html`<ca-city-overview></ca-city-overview>`;
  }
}
