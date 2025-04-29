import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg, str } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { DISTRICT_TYPE_TEXTS, FACTION_TEXTS } from '@texts/index';
import { DISTRICT_STATE_TEXTS } from '../../../../constants';
import { CityMapTooltipContentController } from './controller';

@localized()
@customElement('ca-city-map-tooltip-content')
export class CityMapTooltipContent extends BaseComponent<CityMapTooltipContentController> {
  static styles = css`
    :host {
      display: block;
      border-radius: var(--sl-tooltip-border-radius);
      background-color: var(--sl-tooltip-background-color);
      font-family: var(--sl-tooltip-font-family);
      font-size: var(--sl-tooltip-font-size);
      font-weight: var(--sl-tooltip-font-weight);
      line-height: var(--sl-tooltip-line-height);
      color: var(--sl-tooltip-color);
      padding: var(--sl-tooltip-padding);
      pointer-events: none;
      user-select: none;
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

  protected controller: CityMapTooltipContentController;

  constructor() {
    super();

    this.controller = new CityMapTooltipContentController(this);
  }

  render() {
    if (this.district === undefined || this.district === null) {
      return nothing;
    }

    const districtInfo = this.controller.getDistrictInfo(this.district);

    return html`
      <p>${msg(districtInfo.name)}</p>
      <p>${msg(str`District type: ${DISTRICT_TYPE_TEXTS[districtInfo.districtType].title()}`)}</p>
      <p>${msg(str`Faction: ${FACTION_TEXTS[districtInfo.faction].title()}`)}</p>
      <p>${msg(str`State: ${DISTRICT_STATE_TEXTS[districtInfo.state]()}`)}</p>
    `;
  }
}
