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
        <span> ${formatter.formatTimeShort(this._statisticsGeneralPanelController.gameTime)} </span>

        <span>
          <intl-message label="ui:statistics:general:time:timeTotal">Total time</intl-message>
        </span>
        <span> ${formatter.formatTimeShort(this._statisticsGeneralPanelController.gameTimeTotal)} </span>
      </div>

      <ca-statistics-multipliers></ca-statistics-multipliers>
    `;
  }
}
