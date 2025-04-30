import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg, str } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { HINT_ICON, hintIconStyle, pageTitleStyle } from '@shared/styles';
import { DISTRICT_TYPE_TEXTS, FACTION_TEXTS } from '@texts/index';
import { DISTRICT_STATE_TEXTS } from '../../../../constants';
import { CityDistrictOverviewPanelController } from './controller';

@localized()
@customElement('ca-city-district-overiew-panel')
export class CityDistrictOverviewPanel extends BaseComponent<CityDistrictOverviewPanelController> {
  static styles = [
    pageTitleStyle,
    hintIconStyle,
    css`
      :host {
        display: block;
      }

      p.text {
        margin: 0;
      }

      p.tier {
        margin: 0;
      }
    `,
  ];

  @property({
    attribute: 'district-index',
    type: Number,
  })
  districtIndex!: number;

  protected controller: CityDistrictOverviewPanelController;

  constructor() {
    super();

    this.controller = new CityDistrictOverviewPanelController(this);
  }

  render() {
    const formatter = this.controller.formatter;

    const districtState = this.controller.getDistrictState(this.districtIndex);

    const formattedTier = formatter.formatQuality(districtState.parameters.tier.tier);

    return html`
      <p class="text">
        ${msg(str`District type: ${DISTRICT_TYPE_TEXTS[districtState.districtType].title()}`)}

        <sl-tooltip>
          <span slot="content">${DISTRICT_TYPE_TEXTS[districtState.districtType].overview()}</span>
          <sl-icon name=${HINT_ICON}></sl-icon>
        </sl-tooltip>
      </p>

      <p class="text">${msg(str`Tier: ${formattedTier}`)}</p>

      <p class="text">
        ${msg(str`Faction: ${FACTION_TEXTS[districtState.faction].title()}`)}

        <sl-tooltip>
          <span slot="content">${FACTION_TEXTS[districtState.faction].overview()}</span>
          <sl-icon name=${HINT_ICON}></sl-icon>
        </sl-tooltip>
      </p>

      <p class="text">${msg(str`State: ${DISTRICT_STATE_TEXTS[districtState.state]()}`)}</p>
    `;
  }
}
