import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { msg, localized } from '@lit/localize';
import { customElement, queryAll } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { INCOME_SOURCE_NAMES } from '../../../../constants';
import { StatisticsDevelopmentIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-development-income')
export class StatisticsDevelopmentIncome extends BaseComponent {
  static styles = statisticsPanelContentStyle;

  hasPartialUpdate = true;

  private _controller: StatisticsDevelopmentIncomeController;

  @queryAll('span[data-name]')
  private _incomeSourceElements!: NodeListOf<HTMLSpanElement>;

  private _totalIncomeRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this._controller = new StatisticsDevelopmentIncomeController(this);
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('Development points')}</h4>

        <div class="parameters-table">
          ${INCOME_SOURCES.map(this.renderIncomeSource)}

          <span> ${msg('Total')} </span>
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

  handlePartialUpdate = () => {
    const formatter = this._controller.formatter;
    let totalValue = 0;

    this._incomeSourceElements.forEach((element) => {
      const incomeSource = element.dataset.name as IncomeSource;
      const value = this._controller.getDevelopmentIncome(incomeSource);
      totalValue += value;

      element.textContent = formatter.formatNumberFloat(value);
    });

    if (this._totalIncomeRef.value) {
      this._totalIncomeRef.value.textContent = formatter.formatNumberFloat(totalValue);
    }
  };
}
