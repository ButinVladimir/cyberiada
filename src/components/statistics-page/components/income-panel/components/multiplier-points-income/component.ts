import { t } from 'i18next';
import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import type { PointsMultiplierType } from '@shared/types';
import { StatisticsMultiplierPointsIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@customElement('ca-statistics-multiplier-points-income')
export class StatisticsCodeBaseIncome extends BaseComponent<StatisticsMultiplierPointsIncomeController> {
  static styles = statisticsPanelContentStyle;

  @property({
    attribute: true,
  })
  type!: PointsMultiplierType;

  protected controller: StatisticsMultiplierPointsIncomeController;

  constructor() {
    super();

    this.controller = new StatisticsMultiplierPointsIncomeController(this);
  }

  render() {
    const formatter = this.controller.formatter;

    const pointsByProgram = this.controller.getPointsByProgram(this.type);

    return html`
      <sl-details>
        <h4 class="title" slot="summary">
          ${t(`statistics.income.${this.type}.title`, { ns: 'ui' })}

          <sl-tooltip>
            <span slot="content"> ${t(`statistics.hints.${this.type}`, { ns: 'ui' })} </span>

            <sl-icon name="question-circle"></sl-icon>
          </sl-tooltip>
        </h4>

        <div class="parameters-table">
          ${pointsByProgram > 0
            ? html`
                <span> ${t(`statistics.income.${this.type}.pointsByProgram`, { ns: 'ui' })} </span>
                <span> ${formatter.formatNumberFloat(pointsByProgram)} </span>
              `
            : nothing}
        </div>
      </sl-details>
    `;
  }
}
