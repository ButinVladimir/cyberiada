import { html, PropertyValues } from 'lit';
import { map } from 'lit/directives/map.js';
import { localized, msg } from '@lit/localize';
import { customElement, queryAll } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { STATISTIC_HINTS, STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { IDistrictState } from '@state/city-state';
import { HINT_ICON } from '@shared/styles';
import { StatisticsConnectivityController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-connectivity')
export class StatisticsConnectivity extends BaseComponent<StatisticsConnectivityController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsConnectivityController;

  @queryAll('span[data-district]')
  private _districtValueNodes!: NodeListOf<HTMLSpanElement>;

  constructor() {
    super();

    this.controller = new StatisticsConnectivityController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">
          ${msg('Connectivity')}

          <sl-tooltip>
            <span slot="content"> ${STATISTIC_HINTS.connectivity()} </span>

            <sl-icon name=${HINT_ICON}></sl-icon>
          </sl-tooltip>
        </h4>

        <div class="parameters-table">${map(this.controller.listAvailableDistricts(), this.renderDistrict)}</div>
      </sl-details>
    `;
  }

  private renderDistrict = (districtState: IDistrictState) => {
    return html`
      <span> ${STATISTIC_PAGE_TEXTS.byDistrict(districtState.name)}</span>
      <span data-district=${districtState.index}></span>
    `;
  };

  handlePartialUpdate = () => {
    const formatter = this.controller.formatter;

    this._districtValueNodes.forEach((element) => {
      const districtIndex = parseInt(element.dataset.district!);
      const value = this.controller.getDistrictConnectivity(districtIndex);

      element.textContent = formatter.formatNumberFloat(value);
    });
  };
}
