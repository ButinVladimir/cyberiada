import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsProgramCompletionSpeedController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-program-completion-speed')
export class StatisticsProgramCompletionSpeed extends BaseComponent<StatisticsProgramCompletionSpeedController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsProgramCompletionSpeedController;

  constructor() {
    super();

    this.controller = new StatisticsProgramCompletionSpeedController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:growth:programCompletionSpeed:title">Program completion speed</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:growth:programCompletionSpeed:pointsPerSecond">
            Program completion speed
          </intl-message>
        </span>
        <span> ${formatter.formatNumberLong(this.controller.programCompletionSpeed)} </span>
      </div>
    `;
  }
}
