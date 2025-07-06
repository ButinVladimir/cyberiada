import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import styles from './styles';

@localized()
@customElement('ca-city-map-page')
export class CityMapPage extends BaseComponent {
  static styles = styles;

  protected renderDesktop() {
    return html`
      <h3 class="title">${msg('City')}</h3>

      <p class="hint">
        ${msg(`Click on a highlighted district to see it's info and available actions.
Districts in locked state cannot be interacted with.`)}
      </p>

      <div class="content">
        <ca-city-map> </ca-city-map>
      </div>
    `;
  }
}
