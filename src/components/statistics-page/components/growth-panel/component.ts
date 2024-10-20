import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { StatisticsGrowthPanelController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-growth-panel')
export class StatisticsGrowthPanel extends LitElement {
  static styles = statisticsPanelContentStyle;

  private _statisticsGrowthPanelController: StatisticsGrowthPanelController;

  constructor() {
    super();

    this._statisticsGrowthPanelController = new StatisticsGrowthPanelController(this);
  }

  render() {
    const formatter = this._statisticsGrowthPanelController.formatter;

    return html`
      ${this.renderIncomeSection(
        'money',
        this._statisticsGrowthPanelController.moneyIncomeTotal,
        this._statisticsGrowthPanelController.getMoneyIncome,
      )}
      ${this.renderIncomeSection(
        'cityDevelopmentPoints',
        this._statisticsGrowthPanelController.cityDevelopmentSpeedTotal,
        this._statisticsGrowthPanelController.getCityDevelopmentSpeed,
      )}

      <h4 class="title">
        <intl-message label="ui:statistics:growth:programCompletionSpeed:title">Program completion speed</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:growth:programCompletionSpeed:pointsPerSecond">
            Program completion speed
          </intl-message>
        </span>
        <span> ${formatter.formatNumberLong(this._statisticsGrowthPanelController.programCompletionSpeed)} </span>
      </div>

      <h4 class="title">
        <intl-message label="ui:statistics:growth:pointsByPrograms:title">Points per second by programs</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:growth:pointsByPrograms:codebase">Codebase</intl-message>
        </span>
        <span> ${formatter.formatNumberLong(this._statisticsGrowthPanelController.codebaseByProgram)} </span>
      </div>
    `;
  }

  private renderIncomeSection = (
    section: string,
    totalValue: number,
    valueGetter: (incomeSource: IncomeSource) => number,
  ) => {
    const formatter = this._statisticsGrowthPanelController.formatter;

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:growth:${section}:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${INCOME_SOURCES.map((incomeSource) =>
          this.renderIncomeSource(section, incomeSource, valueGetter(incomeSource)),
        )}

        <span>
          <intl-message label="ui:statistics:total">Total</intl-message>
        </span>
        <span> ${formatter.formatNumberLong(totalValue)} </span>
      </div>
    `;
  };

  private renderIncomeSource = (section: string, incomeSource: IncomeSource, value: number) => {
    const formatter = this._statisticsGrowthPanelController.formatter;

    return html`
      <span>
        <intl-message label="ui:statistics:growth:${section}:${incomeSource}">Income source</intl-message>
      </span>
      <span> ${formatter.formatNumberLong(value)} </span>
    `;
  };
}
