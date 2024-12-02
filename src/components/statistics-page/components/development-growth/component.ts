import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { StatisticsDevelopmentGrowthController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-development-growth')
export class StatisticsDevelopmentGrowth extends BaseComponent<StatisticsDevelopmentGrowthController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsDevelopmentGrowthController;

  constructor() {
    super();

    this.controller = new StatisticsDevelopmentGrowthController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;
    const total = this.controller.developmentTotalGrowth;

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:growth:developmentPoints:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${INCOME_SOURCES.map((incomeSource) =>
          this.renderIncomeSource(incomeSource, this.controller.getDevelopmentGrowth(incomeSource)),
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
        <intl-message label="ui:statistics:growth:developmentPoints:${incomeSource}">Income source</intl-message>
      </span>
      <span> ${formatter.formatNumberLong(value)} </span>
    `;
  };
}
