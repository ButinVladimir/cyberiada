import { css, html, nothing } from 'lit';
import { consume } from '@lit/context';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { HINT_ICON, hintIconStyle } from '@shared/styles';
import { COMMON_TEXTS, DISTRICT_TYPE_TEXTS, FACTION_TEXTS } from '@texts/index';
import { DISTRICT_STATE_TEXTS } from '../../../../../../constants';
import { CityDistrictOverviewPanelValuesController } from './controller';
import { districtIndexContext } from '../../../../contexts';

@localized()
@customElement('ca-city-district-overview-panel-values')
export class CityDistrictOverviewPanelValues extends BaseComponent {
  static styles = [
    hintIconStyle,
    css`
      :host {
        display: block;
      }

      p.text {
        margin: 0;
      }
    `,
  ];

  @consume({ context: districtIndexContext, subscribe: true })
  private _districtIndex?: number;

  private _controller: CityDistrictOverviewPanelValuesController;

  constructor() {
    super();

    this._controller = new CityDistrictOverviewPanelValuesController(this);
  }

  render() {
    if (this._districtIndex === undefined) {
      return nothing;
    }

    const formatter = this._controller.formatter;

    const districtState = this._controller.getDistrictState(this._districtIndex);

    const formattedTier = formatter.formatTier(districtState.parameters.tier.tier);

    return html`
      <p class="text">
        ${msg(
          COMMON_TEXTS.parameterValue(msg('District type'), DISTRICT_TYPE_TEXTS[districtState.districtType].title()),
        )}

        <sl-tooltip>
          <span slot="content">${DISTRICT_TYPE_TEXTS[districtState.districtType].overview()}</span>

          <sl-icon name=${HINT_ICON}></sl-icon>
        </sl-tooltip>
      </p>

      <p class="text">${msg(COMMON_TEXTS.parameterValue(COMMON_TEXTS.tier(), formattedTier))}</p>

      <p class="text">
        ${msg(COMMON_TEXTS.parameterValue(COMMON_TEXTS.faction(), FACTION_TEXTS[districtState.faction].title()))}

        <sl-tooltip>
          <span slot="content">${FACTION_TEXTS[districtState.faction].overview()}</span>
          <sl-icon name=${HINT_ICON}></sl-icon>
        </sl-tooltip>
      </p>

      <p class="text">${msg(COMMON_TEXTS.parameterValue(msg('State'), DISTRICT_STATE_TEXTS[districtState.state]()))}</p>
    `;
  }
}
