import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StatisticsGeneralPanelController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-general-panel')
export class StatisticsGeneralPanel extends LitElement {
  static styles = statisticsPanelContentStyle;

  private _statisticsGeneralPanelController: StatisticsGeneralPanelController;

  constructor() {
    super();

    this._statisticsGeneralPanelController = new StatisticsGeneralPanelController(this);
  }

  render() {
    const formatter = this._statisticsGeneralPanelController.formatter;

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:general:time:title">In-game passed time</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:general:time:timeThisRun">Time this run</intl-message>
        </span>
        <span> ${formatter.formatTimeShort(this._statisticsGeneralPanelController.timeThisRun)} </span>

        <span>
          <intl-message label="ui:statistics:general:time:timeTotal">Total time</intl-message>
        </span>
        <span> ${formatter.formatTimeShort(this._statisticsGeneralPanelController.timeTotal)} </span>
      </div>

      <h4 class="title">
        <intl-message label="ui:statistics:general:multipliers:title">Multipliers and discounts</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:general:multipliers:programCompletionSpeed"
            >Program completion speed</intl-message
          >
        </span>
        <span>
          ${formatter.formatNumberFloat(this._statisticsGeneralPanelController.programCompletionSpeedMultiplier)}
        </span>
      </div>
    `;
  }
}
