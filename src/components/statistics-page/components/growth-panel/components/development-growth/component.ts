import { html, nothing } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { msg, localized } from '@lit/localize';
import { customElement, queryAll } from 'lit/decorators.js';
import { BaseComponent, Feature, IncomeSource } from '@shared/index';
import { INCOME_SOURCE_NAMES, STATISTIC_PAGE_TEXTS } from '../../../../constants';
import { StatisticsDevelopmentGrowthController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-development-growth')
export class StatisticsDevelopmentGrowth extends BaseComponent {
  static styles = statisticsPanelContentStyle;

  hasPartialUpdate = true;

  private _controller: StatisticsDevelopmentGrowthController;

  @queryAll('span[data-name]')
  private _incomeSourceElements!: NodeListOf<HTMLSpanElement>;

  private _totalGrowthRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this._controller = new StatisticsDevelopmentGrowthController(this);
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('Development points per second')}</h4>

        <div class="parameters-table">
          ${this.renderIncomeSource(IncomeSource.program)}
          ${this._controller.isFeatureUnlocked(Feature.companyManagement)
            ? this.renderIncomeSource(IncomeSource.sidejob)
            : nothing}

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
      const value = this._controller.getDevelopmentGrowthByIncoumeSource(incomeSource);

      element.textContent = formatter.formatNumberFloat(value);
    });

    if (this._totalGrowthRef.value) {
      const totalValue = this._controller.developmentTotalGrowth;

      this._totalGrowthRef.value.textContent = formatter.formatNumberFloat(totalValue);
    }
  };
}
