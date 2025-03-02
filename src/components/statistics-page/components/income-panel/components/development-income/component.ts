import { t } from 'i18next';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { StatisticsDevelopmentIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@customElement('ca-statistics-development-income')
export class StatisticsDevelopmentIncome extends BaseComponent<StatisticsDevelopmentIncomeController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsDevelopmentIncomeController;

  constructor() {
    super();

    this.controller = new StatisticsDevelopmentIncomeController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;
    const total = INCOME_SOURCES.reduce(
      (sum, incomeSource) => sum + this.controller.getDevelopmentIncome(incomeSource),
      0,
    );

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${t('statistics.income.developmentPoints.title', { ns: 'ui' })}</h4>

        <div class="parameters-table">
          ${INCOME_SOURCES.map((incomeSource) =>
            this.renderIncomeSource(incomeSource, this.controller.getDevelopmentIncome(incomeSource)),
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
      <span> ${t(`statistics.income.developmentPoints.${incomeSource}`, { ns: 'ui' })} </span>
      <span> ${formatter.formatNumberFloat(value)} </span>
    `;
  };
}
