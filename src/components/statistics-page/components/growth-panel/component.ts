import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
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
      <h4 class="title">
        <intl-message label="ui:statistics:growth:moneyIncome:title">Money income per second</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:growth:moneyIncome:byProgram">By sharing server</intl-message>
        </span>
        <span> ${formatter.formatNumberLong(this._statisticsGrowthPanelController.moneyIncomeByPrograms)} </span>

        <span>
          <intl-message label="ui:statistics:total">Total</intl-message>
        </span>
        <span> ${formatter.formatNumberLong(this._statisticsGrowthPanelController.moneyIncomeTotal)} </span>
      </div>

      <h4 class="title">
        <intl-message label="ui:statistics:growth:cityDevelopmentSpeed:title"
          >City development points per second</intl-message
        >
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:growth:cityDevelopmentSpeed:byProgram">By sharing server</intl-message>
        </span>
        <span>
          ${formatter.formatNumberLong(this._statisticsGrowthPanelController.cityDevelopmentSpeedByPrograms)}
        </span>

        <span>
          <intl-message label="ui:statistics:total">Total</intl-message>
        </span>
        <span> ${formatter.formatNumberLong(this._statisticsGrowthPanelController.cityDevelopmentSpeedTotal)} </span>
      </div>

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
    `;
  }
}
