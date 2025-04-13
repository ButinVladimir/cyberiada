import { html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { INCOME_SOURCE_NAMES } from '@texts/common';
import { StatisticsMoneyGrowthController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-money-growth')
export class StatisticsMoneyGrowth extends BaseComponent<StatisticsMoneyGrowthController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsMoneyGrowthController;

  constructor() {
    super();

    this.controller = new StatisticsMoneyGrowthController(this);
  }

  render() {
    const formatter = this.controller.formatter;
    const total = this.controller.moneyTotalGrowth;

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('Money income per second')}</h4>

        <div class="parameters-table">
          ${INCOME_SOURCES.map((incomeSource) =>
            this.renderIncomeSource(incomeSource, this.controller.getMoneyGrowthByIncomeSource(incomeSource)),
          )}

          <span> ${msg('Total')} </span>
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
      <span> ${INCOME_SOURCE_NAMES[incomeSource]()} </span>
      <span> ${formatter.formatNumberFloat(value)} </span>
    `;
  };
}
