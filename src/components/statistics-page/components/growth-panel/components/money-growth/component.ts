import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { msg, localized } from '@lit/localize';
import { customElement, queryAll } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { INCOME_SOURCE_NAMES, STATISTIC_PAGE_TEXTS } from '../../../../constants';
import { StatisticsMoneyGrowthController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-money-growth')
export class StatisticsMoneyGrowth extends BaseComponent {
  static styles = statisticsPanelContentStyle;

  hasPartialUpdate = true;

  private _controller: StatisticsMoneyGrowthController;

  @queryAll('span[data-name]')
  private _incomeSourceElements!: NodeListOf<HTMLSpanElement>;

  private _totalGrowthRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this._controller = new StatisticsMoneyGrowthController(this);
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('Money income per second')}</h4>

        <div class="parameters-table">
          ${INCOME_SOURCES.map(this.renderIncomeSource)}

          <span> ${STATISTIC_PAGE_TEXTS.total()} </span>
          <span ${ref(this._totalGrowthRef)}> </span>
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

  handlePartialUpdate = () => {
    const formatter = this._controller.formatter;

    this._incomeSourceElements.forEach((element) => {
      const incomeSource = element.dataset.name as IncomeSource;
      const value = this._controller.getMoneyGrowthByIncomeSource(incomeSource);

      element.textContent = formatter.formatNumberFloat(value);
    });

    if (this._totalGrowthRef.value) {
      const totalValue = this._controller.moneyTotalGrowth;

      this._totalGrowthRef.value.textContent = formatter.formatNumberFloat(totalValue);
    }
  };
}
