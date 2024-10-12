import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StatisticsGrowthPanelController } from './controller';

@customElement('ca-statistics-growth-panel')
export class StatisticsGrowthPanel extends LitElement {
  static styles = css`
    :host {
      width: 60em;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-2x-small);
      line-height: var(--sl-line-height-normal);
    }

    .parameters-table {
      display: grid;
      column-gap: var(--sl-spacing-3x-small);
      row-gap: var(--sl-spacing-3x-small);
      grid-template-columns: 40em 0fr;
      grid-auto-rows: auto;
      margin-bottom: var(--sl-spacing-small);
    }
  `;

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
          <intl-message label="ui:statistics:growth:moneyIncome:total">Total</intl-message>
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
          <intl-message label="ui:statistics:growth:cityDevelopmentSpeed:total">Total</intl-message>
        </span>
        <span> ${formatter.formatNumberLong(this._statisticsGrowthPanelController.cityDevelopmentSpeedTotal)} </span>
      </div>

      <h4 class="title">
        <intl-message label="ui:statistics:growth:programCompletionSpeed:title">Program completion speed</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:growth:programCompletionSpeed:multiplier">
            Program completion speed multiplier
          </intl-message>
        </span>
        <span>
          ${formatter.formatNumberFloat(this._statisticsGrowthPanelController.programCompletionSpeedMultiplier)}
        </span>

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
