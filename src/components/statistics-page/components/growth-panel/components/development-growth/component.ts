import { t } from 'i18next';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { StatisticsDevelopmentGrowthController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@customElement('ca-statistics-development-growth')
export class StatisticsDevelopmentGrowth extends BaseComponent<StatisticsDevelopmentGrowthController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsDevelopmentGrowthController;

  constructor() {
    super();

    this.controller = new StatisticsDevelopmentGrowthController(this);
  }

  render() {
    const formatter = this.controller.formatter;
    const total = this.controller.developmentTotalGrowth;

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${t('statistics.growth.developmentPoints.title', { ns: 'ui' })}</h4>

        <div class="parameters-table">
          ${INCOME_SOURCES.map((incomeSource) =>
            this.renderIncomeSource(incomeSource, this.controller.getDevelopmentGrowthByIncoumeSource(incomeSource)),
          )}

          <span> ${t('statistics.total', { ns: 'ui' })} </span>
          <span> ${formatter.formatNumberFloat(total)} </span>
        </div>
      </sl-details>
    `;
  }

  private renderIncomeSource = (incomeSource: IncomeSource, value: number) => {
    if (value <= 0) {
      return '';
    }

    const formatter = this.controller.formatter;

    return html`
      <span> ${t(`statistics.growth.developmentPoints.${incomeSource}`, { ns: 'ui' })} </span>
      <span> ${formatter.formatNumberFloat(value)} </span>
    `;
  };
}
