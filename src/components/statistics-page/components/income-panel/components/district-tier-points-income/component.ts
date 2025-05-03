import { html, PropertyValues } from 'lit';
import { localized, msg } from '@lit/localize';
import { map } from 'lit/directives/map.js';
import { customElement, queryAll } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { IDistrictState } from '@state/city-state';
import { StatisticsDistrictTierPointsIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-district-tier-points-income')
export class StatisticsDistrictTierPointsIncome extends BaseComponent<StatisticsDistrictTierPointsIncomeController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsDistrictTierPointsIncomeController;

  @queryAll('span[data-district]')
  private _districtValueNodes!: NodeListOf<HTMLSpanElement>;

  constructor() {
    super();

    this.controller = new StatisticsDistrictTierPointsIncomeController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('District tier points')}</h4>

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

  private handlePartialUpdate = () => {
    const formatter = this.controller.formatter;

    this._districtValueNodes.forEach((element) => {
      const districtIndex = parseInt(element.dataset.district!);
      const value = this.controller.getPointsByDistrict(districtIndex);

      element.textContent = formatter.formatNumberFloat(value);
    });
  };
}
