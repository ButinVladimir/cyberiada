import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsProgramsIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-programs-income')
export class StatisticsProgramsIncome extends BaseComponent<StatisticsProgramsIncomeController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsProgramsIncomeController;

  constructor() {
    super();

    this.controller = new StatisticsProgramsIncomeController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    const computationalBase = this.controller.computationalBase;

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:income:pointsByPrograms:title">Points by programs</intl-message>
      </h4>

      <div class="parameters-table">
        ${computationalBase > 1
          ? html`
              <span>
                <intl-message label="ui:statistics:income:pointsByPrograms:computationalBase">
                  Computational base
                </intl-message>

                <sl-tooltip>
                  <intl-message slot="content" label="ui:statistics:hints:computationalBase">
                    Computational base hint
                  </intl-message>

                  <sl-icon name="question-circle"></sl-icon>
                </sl-tooltip>
              </span>
              <span> ${formatter.formatNumberLong(this.controller.computationalBase)} </span>
            `
          : null}
      </div>
    `;
  }
}
