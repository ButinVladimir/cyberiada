import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { StatisticsMoneyIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-money-income')
export class StatisticsMoneyIncome extends LitElement {
  static styles = statisticsPanelContentStyle;

  private _statisticsMoneyIncomePanelController: StatisticsMoneyIncomeController;

  constructor() {
    super();

    this._statisticsMoneyIncomePanelController = new StatisticsMoneyIncomeController(this);
  }

  render() {
    const formatter = this._statisticsMoneyIncomePanelController.formatter;
    const total = INCOME_SOURCES.reduce(
      (sum, incomeSource) => sum + this._statisticsMoneyIncomePanelController.getMoneyIncome(incomeSource),
      0,
    );

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:income:money:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${INCOME_SOURCES.map((incomeSource) =>
          this.renderIncomeSource(
            incomeSource,
            this._statisticsMoneyIncomePanelController.getMoneyIncome(incomeSource),
          ),
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

    const formatter = this._statisticsMoneyIncomePanelController.formatter;

    return html`
      <span>
        <intl-message label="ui:statistics:income:money:${incomeSource}">Income source</intl-message>
      </span>
      <span> ${formatter.formatNumberLong(value)} </span>
    `;
  };
}