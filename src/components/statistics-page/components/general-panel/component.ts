import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsGeneralPanelController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-general-panel')
export class StatisticsGeneralPanel extends BaseComponent<StatisticsGeneralPanelController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsGeneralPanelController;

  constructor() {
    super();

    this.controller = new StatisticsGeneralPanelController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:general:time:title">In-game passed time</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:general:time:timeThisRun">Time this run</intl-message>
        </span>
        <span> ${formatter.formatTimeShort(this.controller.gameTime)} </span>

        <span>
          <intl-message label="ui:statistics:general:time:timeTotal">Total time</intl-message>
        </span>
        <span> ${formatter.formatTimeShort(this.controller.gameTimeTotal)} </span>
      </div>

      <ca-statistics-multipliers></ca-statistics-multipliers>
    `;
  }
}
