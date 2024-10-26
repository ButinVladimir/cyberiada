import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PurchaseType } from '@shared/types';
import { PURCHASE_TYPES } from '@shared/constants';
import { StatisticsMoneyExpensesController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-money-expenses')
export class StatisticsMoneyExpenses extends LitElement {
  static styles = statisticsPanelContentStyle;

  private _statisticsMoneyExpensesController: StatisticsMoneyExpensesController;

  constructor() {
    super();

    this._statisticsMoneyExpensesController = new StatisticsMoneyExpensesController(this);
  }

  render() {
    const formatter = this._statisticsMoneyExpensesController.formatter;
    const moneyTotal = PURCHASE_TYPES.reduce(
      (sum, purchaseType) => sum + this._statisticsMoneyExpensesController.getMoneyExpenses(purchaseType),
      0,
    );

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:expenses:money:title">money</intl-message>
      </h4>

      <div class="parameters-table">
        ${PURCHASE_TYPES.map((purchaseType) =>
          this.renderExpenseArticle(
            purchaseType,
            this._statisticsMoneyExpensesController.getMoneyExpenses(purchaseType),
          ),
        )}

        <span>
          <intl-message label="ui:statistics:total">Total</intl-message>
        </span>
        <span> ${formatter.formatNumberLong(moneyTotal)} </span>
      </div>
    `;
  }

  private renderExpenseArticle = (purchaseType: PurchaseType, value: number) => {
    if (value <= 0) {
      return '';
    }

    const formatter = this._statisticsMoneyExpensesController.formatter;

    return html`
      <span>
        <intl-message label="ui:statistics:expenses:money:${purchaseType}">Purchase type</intl-message>
      </span>
      <span> ${formatter.formatNumberLong(value)} </span>
    `;
  };
}
