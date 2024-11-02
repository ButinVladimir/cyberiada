import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StatisticsProgramCompletionSpeedController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-program-completion-speed')
export class StatisticsProgramCompletionSpeed extends LitElement {
  static styles = statisticsPanelContentStyle;

  private _statisticsProgramCompletionSpeedController: StatisticsProgramCompletionSpeedController;

  constructor() {
    super();

    this._statisticsProgramCompletionSpeedController = new StatisticsProgramCompletionSpeedController(this);
  }

  render() {
    const formatter = this._statisticsProgramCompletionSpeedController.formatter;

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
        <span>
          ${formatter.formatNumberLong(this._statisticsProgramCompletionSpeedController.programCompletionSpeed)}
        </span>
      </div>
    `;
  }
}
