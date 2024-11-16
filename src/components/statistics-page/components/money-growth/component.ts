import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { StatisticsMoneyGrowthController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

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
      <h4 class="title">
        <intl-message label="ui:statistics:growth:money:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${INCOME_SOURCES.map((incomeSource) =>
          this.renderIncomeSource(incomeSource, this.controller.getMoneyGrowth(incomeSource)),
        )}

        <span>
          <intl-message label="ui:statistics:total">Total</intl-message>
        </span>
        <span> ${formatter.formatNumberLong(total)} </span>
      </div>
    `;
  }

  private renderIncomeSource = (incomeSource: IncomeSource, value: number) => {
    if (value <= 0) {
      return '';
    }

    const formatter = this.controller.formatter;

    return html`
      <span>
        <intl-message label="ui:statistics:growth:money:${incomeSource}">Income source</intl-message>
      </span>
      <span> ${formatter.formatNumberLong(value)} </span>
    `;
  };
}
