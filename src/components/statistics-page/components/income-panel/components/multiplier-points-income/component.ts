import { html } from 'lit';
import { localized } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import type { PointsMultiplierType } from '@shared/types';
import { POINT_MULTIPLIER_HINTS, STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
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

  constructor() {
    super();

    this.controller = new StatisticsMultiplierPointsIncomeController(this, this.handlePartialUpdate);
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">
          ${MULTIPLIER_POINT_TITLES[this.type]()}

          <sl-tooltip>
            <span slot="content"> ${POINT_MULTIPLIER_HINTS[this.type]()} </span>

            <sl-icon name="question-circle"></sl-icon>
          </sl-tooltip>
        </h4>

        <div class="parameters-table">
          <span> ${STATISTIC_PAGE_TEXTS.byPrograms()} </span>
          <span ${ref(this._programPointsRef)}> </span>
        </div>
      </sl-details>
    `;
  }

  private handlePartialUpdate = () => {
    const formatter = this.controller.formatter;

    if (this._programPointsRef.value) {
      const pointsByProgram = this.controller.getPointsByProgram(this.type);

      this._programPointsRef.value.textContent = formatter.formatNumberFloat(pointsByProgram);
    }
  };
}
