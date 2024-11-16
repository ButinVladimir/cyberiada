import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { IDistrictInfo } from '@state/city-state/interfaces';
import { BaseComponent } from '@shared/base-component';

@customElement('ca-city-district-info-panel')
export class CityDistrictInfoPanel extends BaseComponent {
  static styles = css`
    p {
      margin-top: 0;
    }
  `;

  @property({
    attribute: false,
  })
  districtInfo?: IDistrictInfo;

  renderContent() {
    if (!this.districtInfo) {
      return null;
    }

    return html`
      <p><intl-message label="ui:city:cityOverview:name">Name</intl-message>: ${this.districtInfo.name}</p>
    `;
  }
}
