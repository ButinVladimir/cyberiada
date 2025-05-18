import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { COMMON_TEXTS, DISTRICT_NAMES, DISTRICT_TYPE_TEXTS, FACTION_TEXTS } from '@texts/index';
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

    const formattedTier = formatter.formatTier(districtState.parameters.tier.tier);

    return html`
      <p>${msg(DISTRICT_NAMES[districtState.name]())}</p>
      <p>
        ${msg(
          COMMON_TEXTS.parameterValue(msg('District type'), DISTRICT_TYPE_TEXTS[districtState.districtType].title()),
        )}
      </p>
      <p>${msg(COMMON_TEXTS.parameterValue(COMMON_TEXTS.tier(), formattedTier))}</p>
      <p>${msg(COMMON_TEXTS.parameterValue(COMMON_TEXTS.faction(), FACTION_TEXTS[districtState.faction].title()))}</p>
      <p>${msg(COMMON_TEXTS.parameterValue(msg('State'), DISTRICT_STATE_TEXTS[districtState.state]()))}</p>
    `;
  }
}
