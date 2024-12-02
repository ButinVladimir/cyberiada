import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { StatisticsMoneyIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-money-income')
export class StatisticsMoneyIncome extends BaseComponent<StatisticsMoneyIncomeController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsMoneyIncomeController;

  constructor() {
    super();

    this.controller = new StatisticsMoneyIncomeController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;
    const total = INCOME_SOURCES.reduce((sum, incomeSource) => sum + this.controller.getMoneyIncome(incomeSource), 0);

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:income:money:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${INCOME_SOURCES.map((incomeSource) =>
          this.renderIncomeSource(incomeSource, this.controller.getMoneyIncome(incomeSource)),
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
        <intl-message label="ui:statistics:income:money:${incomeSource}">Income source</intl-message>
      </span>
      <span> ${formatter.formatNumberLong(value)} </span>
    `;
  };
}
