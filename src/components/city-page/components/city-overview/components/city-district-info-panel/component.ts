import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { IDistrictInfo } from '@state/city-state/interfaces';

@customElement('ca-city-district-info-panel')
export class CityDistrictInfoPanel extends LitElement {
  static styles = css`
    p {
      margin-top: 0;
    }
  `;

  @property({
    attribute: false,
  })
  districtInfo?: IDistrictInfo;

  render() {
    if (!this.districtInfo) {
      return null;
    }

    return html`
      <p><intl-message label="ui:city:cityOverview:name">Name</intl-message>: ${this.districtInfo.name}</p>
    `;
  }
}
