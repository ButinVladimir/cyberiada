import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@/shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { StatisticsCityDevelopmentIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-city-development-income')
export class StatisticsCityDevelopmentIncome extends BaseComponent<StatisticsCityDevelopmentIncomeController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsCityDevelopmentIncomeController;

  constructor() {
    super();

    this.controller = new StatisticsCityDevelopmentIncomeController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;
    const total = INCOME_SOURCES.reduce(
      (sum, incomeSource) => sum + this.controller.getCityDevelopmentIncome(incomeSource),
      0,
    );

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:income:cityDevelopmentPoints:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${INCOME_SOURCES.map((incomeSource) =>
          this.renderIncomeSource(incomeSource, this.controller.getCityDevelopmentIncome(incomeSource)),
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
        <intl-message label="ui:statistics:income:cityDevelopmentPoints:${incomeSource}">Income source</intl-message>
      </span>
      <span> ${formatter.formatNumberLong(value)} </span>
    `;
  };
}
