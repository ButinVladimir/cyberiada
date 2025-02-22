import { t } from 'i18next';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { PurchaseType } from '@shared/types';
import { PURCHASE_TYPES } from '@shared/constants';
import { StatisticsMoneyExpensesController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@customElement('ca-statistics-money-expenses')
export class StatisticsMoneyExpenses extends BaseComponent<StatisticsMoneyExpensesController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsMoneyExpensesController;

  constructor() {
    super();

    this.controller = new StatisticsMoneyExpensesController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;
    const moneyTotal = PURCHASE_TYPES.reduce(
      (sum, purchaseType) => sum + this.controller.getMoneyExpenses(purchaseType),
      0,
    );

    return html`
      <h4 class="title">${t('statistics.expenses.money.title', { ns: 'ui' })}</h4>

      <div class="parameters-table">
        ${PURCHASE_TYPES.map((purchaseType) =>
          this.renderExpenseArticle(purchaseType, this.controller.getMoneyExpenses(purchaseType)),
        )}

        <span> ${t('statistics.total', { ns: 'ui' })} </span>
        <span> ${formatter.formatNumberFloat(moneyTotal)} </span>
      </div>
    `;
  }

  private renderExpenseArticle = (purchaseType: PurchaseType, value: number) => {
    if (value <= 0) {
      return '';
    }

    const formatter = this.controller.formatter;

    return html`
      <span> ${t(`statistics.expenses.money.${purchaseType}`, { ns: 'ui' })} </span>
      <span> ${formatter.formatNumberFloat(value)} </span>
    `;
  };
}
