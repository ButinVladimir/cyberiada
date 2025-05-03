import { html, PropertyValues } from 'lit';
import { localized, msg } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import { map } from 'lit/directives/map.js';
import { customElement, queryAll } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { STATISTIC_HINTS, STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { HINT_ICON } from '@shared/styles';
import { IDistrictState } from '@state/city-state';
import { StatisticsConnectivityPointsIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-connectivity-points-income')
export class StatisticsConnectivityPointsIncome extends BaseComponent<StatisticsConnectivityPointsIncomeController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsConnectivityPointsIncomeController;

  private _programPointsRef = createRef<HTMLSpanElement>();

  @queryAll('span[data-district]')
  private _districtValueNodes!: NodeListOf<HTMLSpanElement>;

  constructor() {
    super();

    this.controller = new StatisticsConnectivityPointsIncomeController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">
          ${msg('Connectivity points')}

          <sl-tooltip>
            <span slot="content"> ${STATISTIC_HINTS.connectivity()} </span>

            <sl-icon name=${HINT_ICON}></sl-icon>
          </sl-tooltip>
        </h4>

        <div class="parameters-table">
          <span> ${STATISTIC_PAGE_TEXTS.byPrograms()} </span>
          <span ${ref(this._programPointsRef)}> </span>

          ${map(this.controller.listAvailableDistricts(), this.renderDistrict)}
        </div>
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

    if (this._programPointsRef.value) {
      const pointsByProgram = this.controller.getPointsByProgram();

      this._programPointsRef.value.textContent = formatter.formatNumberFloat(pointsByProgram);
    }

    this._districtValueNodes.forEach((element) => {
      const districtIndex = parseInt(element.dataset.district!);
      const value = this.controller.getPointsByDistrict(districtIndex);

      element.textContent = formatter.formatNumberFloat(value);
    });
  };
}
