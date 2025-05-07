import { html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { PurchaseType } from '@shared/types';
import { PURCHASE_TYPES } from '@shared/constants';
import { STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { StatisticsMoneyExpensesController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';
import { MONEY_EXPENSE_NAMES } from './constants';

@localized()
@customElement('ca-statistics-money-expenses')
export class StatisticsMoneyExpenses extends BaseComponent {
  static styles = statisticsPanelContentStyle;

  private _controller: StatisticsMoneyExpensesController;

  constructor() {
    super();

    this._controller = new StatisticsMoneyExpensesController(this);
  }

  render() {
    const formatter = this._controller.formatter;
    const moneyTotal = PURCHASE_TYPES.reduce(
      (sum, purchaseType) => sum + this._controller.getMoneyExpenses(purchaseType),
      0,
    );

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('Money expenses')}</h4>

        <div class="parameters-table">
          ${PURCHASE_TYPES.map((purchaseType) =>
            this.renderExpenseArticle(purchaseType, this._controller.getMoneyExpenses(purchaseType)),
          )}

          <span> ${STATISTIC_PAGE_TEXTS.total()} </span>
          <span> ${formatter.formatNumberFloat(moneyTotal)} </span>
        </div>
      </sl-details>
    `;
  }

  private renderExpenseArticle = (purchaseType: PurchaseType, value: number) => {
    if (value <= 0) {
      return '';
    }

    const formatter = this._controller.formatter;

    return html`
      <span> ${MONEY_EXPENSE_NAMES[purchaseType]()} </span>
      <span> ${formatter.formatNumberFloat(value)} </span>
    `;
  };
}
