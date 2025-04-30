import { html, PropertyValues } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { localized } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import type { PointsMultiplierType } from '@shared/types';
import { POINT_MULTIPLIER_HINTS, STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { HINT_ICON } from '@shared/styles';
import { StatisticsMultiplierPointsGrowthController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';
import { MULTIPLIER_POINT_GROWTH_TITLES } from './constants';

@localized()
@customElement('ca-statistics-multiplier-points-growth')
export class StatisticsMultiplierPointsGrowth extends BaseComponent<StatisticsMultiplierPointsGrowthController> {
  static styles = statisticsPanelContentStyle;

  @property({
    attribute: true,
  })
  type!: PointsMultiplierType;

  protected controller: StatisticsMultiplierPointsGrowthController;

  private _programGrowthRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this.controller = new StatisticsMultiplierPointsGrowthController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">
          ${MULTIPLIER_POINT_GROWTH_TITLES[this.type]()}

          <sl-tooltip>
            <span slot="content"> ${POINT_MULTIPLIER_HINTS[this.type]()} </span>

            <sl-icon name=${HINT_ICON}></sl-icon>
          </sl-tooltip>
        </h4>

        <div class="parameters-table">
          <span>${STATISTIC_PAGE_TEXTS.byPrograms()} </span>
          <span ${ref(this._programGrowthRef)}> </span>
        </div>
      </sl-details>
    `;
  }

  private handlePartialUpdate = () => {
    const formatter = this.controller.formatter;

    if (this._programGrowthRef.value) {
      const growthByProgram = this.controller.getGrowthByProgram(this.type);

      this._programGrowthRef.value.textContent = formatter.formatNumberFloat(growthByProgram);
    }
  };
}
