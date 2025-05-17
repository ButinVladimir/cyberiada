import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg, str } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { DISTRICT_TYPE_TEXTS, FACTION_TEXTS } from '@texts/index';
import { DISTRICT_STATE_TEXTS } from '../../../../constants';
import { CityMapDistrictDescriptionController } from './controller';

@localized()
@customElement('ca-city-map-district-description')
export class CityMapDistrictDescription extends BaseComponent {
  static styles = css`
    :host {
      display: block;
    }

    p {
      margin: 0;
      padding: 0;
    }
  `;

  @property({
    attribute: 'district',
    type: Number,
  })
  district?: number | null;

  private _controller: CityMapDistrictDescriptionController;

  constructor() {
    super();

    this._controller = new CityMapDistrictDescriptionController(this);
  }

  render() {
    if (this.district === undefined || this.district === null) {
      return nothing;
    }

    const formatter = this._controller.formatter;

    const districtState = this._controller.getDistrictState(this.district);

    const formattedTier = formatter.formatQuality(districtState.parameters.tier.tier);

    return html`
      <p>${msg(districtState.name)}</p>
      <p>${msg(str`District type: ${DISTRICT_TYPE_TEXTS[districtState.districtType].title()}`)}</p>
      <p>${msg(str`Tier: ${formattedTier}`)}</p>
      <p>${msg(str`Faction: ${FACTION_TEXTS[districtState.faction].title()}`)}</p>
      <p>${msg(str`State: ${DISTRICT_STATE_TEXTS[districtState.state]()}`)}</p>
    `;
  }
}
