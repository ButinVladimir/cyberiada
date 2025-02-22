import { t } from 'i18next';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { StatisticsMoneyGrowthController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@customElement('ca-statistics-money-growth')
export class StatisticsMoneyGrowth extends BaseComponent<StatisticsMoneyGrowthController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsMoneyGrowthController;

  constructor() {
    super();

    this.controller = new StatisticsMoneyGrowthController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;
    const total = this.controller.moneyTotalGrowth;

    return html`
      <h4 class="title">${t('statistics.growth.money.title', { ns: 'ui' })}</h4>

      <div class="parameters-table">
        ${INCOME_SOURCES.map((incomeSource) =>
          this.renderIncomeSource(incomeSource, this.controller.getMoneyGrowthByIncomeSource(incomeSource)),
        )}

        <span> ${t('statistics.total', { ns: 'ui' })} </span>
        <span> ${formatter.formatNumberFloat(total)} </span>
      </div>
    `;
  }

  private renderIncomeSource = (incomeSource: IncomeSource, value: number) => {
    if (value <= 0) {
      return '';
    }

    const formatter = this.controller.formatter;

    return html`
      <span> ${t(`statistics.growth.money.${incomeSource}`, { ns: 'ui' })} </span>
      <span> ${formatter.formatNumberFloat(value)} </span>
    `;
  };
}
