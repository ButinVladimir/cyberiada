import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCES } from '@shared/constants';
import { StatisticsIncomePanelController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-income-panel')
export class StatisticsIncomePanel extends LitElement {
  static styles = statisticsPanelContentStyle;

  private _statisticsIncomePanelController: StatisticsIncomePanelController;

  constructor() {
    super();

    this._statisticsIncomePanelController = new StatisticsIncomePanelController(this);
  }

  render() {
    const formatter = this._statisticsIncomePanelController.formatter;

    return html`
      ${this.renderIncomeSection('money', this._statisticsIncomePanelController.getMoneyIncome)}
      ${this.renderIncomeSection(
        'cityDevelopmentPoints',
        this._statisticsIncomePanelController.getCityDevelopmentPointsIncome,
      )}

      <h4 class="title">
        <intl-message label="ui:statistics:income:pointsByPrograms:title">Points by programs</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:income:pointsByPrograms:codebase">Codebase</intl-message>
        </span>
        <span> ${formatter.formatNumberLong(this._statisticsIncomePanelController.codebaseByProgram)} </span>
      </div>
    `;
  }

  private renderIncomeSection = (section: string, valueGetter: (incomeSource: IncomeSource) => number) => {
    const formatter = this._statisticsIncomePanelController.formatter;
    const total = INCOME_SOURCES.reduce((sum, incomeSource) => sum + valueGetter(incomeSource), 0);

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:income:${section}:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${INCOME_SOURCES.map((incomeSource) =>
          this.renderIncomeSource(section, incomeSource, valueGetter(incomeSource)),
        )}

        <span>
          <intl-message label="ui:statistics:total">Total</intl-message>
        </span>
        <span> ${formatter.formatNumberLong(total)} </span>
      </div>
    `;
  };

  private renderIncomeSource = (section: string, incomeSource: IncomeSource, value: number) => {
    const formatter = this._statisticsIncomePanelController.formatter;

    return html`
      <span>
        <intl-message label="ui:statistics:income:${section}:${incomeSource}">Income source</intl-message>
      </span>
      <span> ${formatter.formatNumberLong(value)} </span>
    `;
  };
}
