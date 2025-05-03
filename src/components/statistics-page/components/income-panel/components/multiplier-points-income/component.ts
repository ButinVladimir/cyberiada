import { html, PropertyValues } from 'lit';
import { localized } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import { map } from 'lit/directives/map.js';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import type { PointsMultiplierType } from '@shared/types';
import { POINT_MULTIPLIER_HINTS, STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { HINT_ICON } from '@shared/styles';
import { IDistrictState } from '@state/city-state';
import { StatisticsMultiplierPointsIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';
import { MULTIPLIER_POINT_TITLES } from './constants';

@localized()
@customElement('ca-statistics-multiplier-points-income')
export class StatisticsMultiplierPointsIncome extends BaseComponent<StatisticsMultiplierPointsIncomeController> {
  static styles = statisticsPanelContentStyle;

  @property({
    attribute: true,
  })
  type!: PointsMultiplierType;

  protected controller: StatisticsMultiplierPointsIncomeController;

  private _programPointsRef = createRef<HTMLSpanElement>();

  @queryAll('span[data-district]')
  private _districtValueNodes!: NodeListOf<HTMLSpanElement>;

  constructor() {
    super();

    this.controller = new StatisticsMultiplierPointsIncomeController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">
          ${MULTIPLIER_POINT_TITLES[this.type]()}

          <sl-tooltip>
            <span slot="content"> ${POINT_MULTIPLIER_HINTS[this.type]()} </span>

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
      const pointsByProgram = this.controller.getPointsByProgram(this.type);

      this._programPointsRef.value.textContent = formatter.formatNumberFloat(pointsByProgram);
    }

    this._districtValueNodes.forEach((element) => {
      const districtIndex = parseInt(element.dataset.district!);
      const value = this.controller.getPointsByDistrict(districtIndex, this.type);

      element.textContent = formatter.formatNumberFloat(value);
    });
  };
}
