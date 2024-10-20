import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PurchaseType } from '@shared/types';
import { PURCHASE_TYPES } from '@shared/constants';
import { StatisticsExpensesPanelController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-expenses-panel')
export class StatisticsExpensesPanel extends LitElement {
  static styles = statisticsPanelContentStyle;

  private _statisticsExpensesPanelController: StatisticsExpensesPanelController;

  constructor() {
    super();

    this._statisticsExpensesPanelController = new StatisticsExpensesPanelController(this);
  }

  render() {
    const formatter = this._statisticsExpensesPanelController.formatter;
    const moneyTotal = PURCHASE_TYPES.reduce(
      (sum, purchaseType) => sum + this._statisticsExpensesPanelController.getMoneyExpenses(purchaseType),
      0,
    );

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:expenses:money:title">money</intl-message>
      </h4>

      <div class="parameters-table">
        ${PURCHASE_TYPES.map((purchaseType) =>
          this.renderMoneyExpenseArticle(
            purchaseType,
            this._statisticsExpensesPanelController.getMoneyExpenses(purchaseType),
          ),
        )}

        <span>
          <intl-message label="ui:statistics:total">Total</intl-message>
        </span>
        <span> ${formatter.formatNumberLong(moneyTotal)} </span>
      </div>
    `;
  }

  private renderMoneyExpenseArticle = (purchaseType: PurchaseType, value: number) => {
    const formatter = this._statisticsExpensesPanelController.formatter;

    return html`
      <span>
        <intl-message label="ui:statistics:expenses:money:${purchaseType}">Purchase type</intl-message>
      </span>
      <span> ${formatter.formatNumberLong(value)} </span>
    `;
  };
}
