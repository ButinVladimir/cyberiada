import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StatisticsProgramsIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-programs-income')
export class StatisticsProgramsIncome extends LitElement {
  static styles = statisticsPanelContentStyle;

  private _statisticsProgramsIncomeController: StatisticsProgramsIncomeController;

  constructor() {
    super();

    this._statisticsProgramsIncomeController = new StatisticsProgramsIncomeController(this);
  }

  render() {
    const formatter = this._statisticsProgramsIncomeController.formatter;

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:income:pointsByPrograms:title">Points per second by programs</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:income:pointsByPrograms:computationalBase"
            >Computational base</intl-message
          >
        </span>
        <span>
          ${formatter.formatNumberLong(this._statisticsProgramsIncomeController.computationalBaseByProgram)}
        </span>
      </div>
    `;
  }
}
