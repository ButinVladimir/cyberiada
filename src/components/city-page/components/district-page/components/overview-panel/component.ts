import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';

@localized()
@customElement('ca-city-district-overview-panel')
export class CityDistrictOverviewPanel extends BaseComponent {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: var(--sl-spacing-2x-large);
      }
    `,
  ];

  render() {
    return html`
      <ca-city-district-overview-panel-values></ca-city-district-overview-panel-values>
      <ca-city-district-overview-panel-next-tier-progress></ca-city-district-overview-panel-next-tier-progress>
    `;
  }
}
