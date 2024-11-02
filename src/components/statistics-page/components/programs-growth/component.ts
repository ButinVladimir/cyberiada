import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StatisticsProgramsGrowthController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-programs-growth')
export class StatisticsProgramsGrowth extends LitElement {
  static styles = statisticsPanelContentStyle;

  private _statisticsProgramsGrowthController: StatisticsProgramsGrowthController;

  constructor() {
    super();

    this._statisticsProgramsGrowthController = new StatisticsProgramsGrowthController(this);
  }

  render() {
    const formatter = this._statisticsProgramsGrowthController.formatter;

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:growth:pointsByPrograms:title">Points per second by programs</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:growth:pointsByPrograms:computationalBase"
            >Computational base</intl-message
          >
        </span>
        <span>
          ${formatter.formatNumberLong(this._statisticsProgramsGrowthController.computationalBaseByProgram)}
        </span>
      </div>
    `;
  }
}
