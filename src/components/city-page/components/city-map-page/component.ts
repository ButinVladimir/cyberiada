import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';

@localized()
@customElement('ca-city-map-page')
export class CityMapPage extends BaseComponent {
  static styles = [
    pageTitleStyle,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        position: relative;
      }

      div.content {
        width: 100%;
      }
    `,
  ];

  render() {
    return html`
      <h3 class="title">${msg('City')}</h3>

      <p>${msg("Click on a highlighted district to see it's info and available actions.")}</p>

      <div class="content">
        <ca-city-map> </ca-city-map>
      </div>
    `;
  }
}
