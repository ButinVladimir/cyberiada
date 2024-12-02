import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsProgramsGrowthController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-programs-growth')
export class StatisticsProgramsGrowth extends BaseComponent<StatisticsProgramsGrowthController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsProgramsGrowthController;

  constructor() {
    super();

    this.controller = new StatisticsProgramsGrowthController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    const computationalBase = this.controller.computationalBase;

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:growth:pointsByPrograms:title">Points per second by programs</intl-message>
      </h4>

      ${computationalBase > 0
        ? html`
            <div class="parameters-table">
              <span>
                <intl-message label="ui:statistics:growth:pointsByPrograms:computationalBase">
                  Computational base
                </intl-message>

                <sl-tooltip>
                  <intl-message slot="content" label="ui:statistics:hints:computationalBase">
                    Computational base hint
                  </intl-message>

                  <sl-icon name="question-circle"></sl-icon>
                </sl-tooltip>
              </span>
              <span> ${formatter.formatNumberLong(computationalBase)} </span>
            </div>
          `
        : null}
    `;
  }
}
