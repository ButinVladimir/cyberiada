import { html, PropertyValues } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { msg, localized } from '@lit/localize';
import { customElement, queryAll } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { INCOME_SOURCE_NAMES, STATISTIC_PAGE_TEXTS } from '../../../../constants';
import { StatisticsMoneyIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-money-income')
export class StatisticsMoneyIncome extends BaseComponent<StatisticsMoneyIncomeController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsMoneyIncomeController;

  @queryAll('span[data-name]')
  private _incomeSourceElements!: NodeListOf<HTMLSpanElement>;

  private _totalIncomeRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this.controller = new StatisticsMoneyIncomeController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('Money')}</h4>

        <div class="parameters-table">
          ${INCOME_SOURCES.map((incomeSource) => this.renderIncomeSource(incomeSource))}

          <span> ${STATISTIC_PAGE_TEXTS.total()} </span>
          <span ${ref(this._totalIncomeRef)}> </span>
        </div>
      </sl-details>
    `;
  }

  private renderIncomeSource = (incomeSource: IncomeSource) => {
    return html`
      <span> ${INCOME_SOURCE_NAMES[incomeSource]()} </span>
      <span data-name=${incomeSource}> </span>
    `;
  };

  private handlePartialUpdate = () => {
    const formatter = this.controller.formatter;
    let totalValue = 0;

    this._incomeSourceElements.forEach((element) => {
      const incomeSource = element.dataset.name as IncomeSource;
      const value = this.controller.getMoneyIncome(incomeSource);
      totalValue += value;

      element.textContent = formatter.formatNumberFloat(value);
    });

    if (this._totalIncomeRef.value) {
      this._totalIncomeRef.value.textContent = formatter.formatNumberFloat(totalValue);
    }
  };
}
