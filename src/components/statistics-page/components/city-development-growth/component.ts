import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { StatisticsCityDevelopmentGrowthController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-city-development-growth')
export class StatisticsCityDevelopmentGrowth extends LitElement {
  static styles = statisticsPanelContentStyle;

  private _statisticsCityDevelopmentGrowthPanelController: StatisticsCityDevelopmentGrowthController;

  constructor() {
    super();

    this._statisticsCityDevelopmentGrowthPanelController = new StatisticsCityDevelopmentGrowthController(this);
  }

  render() {
    const formatter = this._statisticsCityDevelopmentGrowthPanelController.formatter;
    const total = this._statisticsCityDevelopmentGrowthPanelController.cityDevelopmentTotalGrowth;

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:growth:cityDevelopmentPoints:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${INCOME_SOURCES.map((incomeSource) =>
          this.renderIncomeSource(
            incomeSource,
            this._statisticsCityDevelopmentGrowthPanelController.getCityDevelopmentGrowth(incomeSource),
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

    const formatter = this._statisticsCityDevelopmentGrowthPanelController.formatter;

    return html`
      <span>
        <intl-message label="ui:statistics:growth:cityDevelopmentPoints:${incomeSource}">Income source</intl-message>
      </span>
      <span> ${formatter.formatNumberLong(value)} </span>
    `;
  };
}
