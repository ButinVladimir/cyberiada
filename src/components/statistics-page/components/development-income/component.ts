import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@/shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { StatisticsDevelopmentIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

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
      <h4 class="title">
        <intl-message label="ui:statistics:income:developmentPoints:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${INCOME_SOURCES.map((incomeSource) =>
          this.renderIncomeSource(incomeSource, this.controller.getDevelopmentIncome(incomeSource)),
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
        <intl-message label="ui:statistics:income:developmentPoints:${incomeSource}">Income source</intl-message>
      </span>
      <span> ${formatter.formatNumberLong(value)} </span>
    `;
  };
}
