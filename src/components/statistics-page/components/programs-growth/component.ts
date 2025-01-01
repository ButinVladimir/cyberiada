import { t } from 'i18next';
import { html, nothing } from 'lit';
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
      <h4 class="title">${t('statistics.growth.pointsByPrograms.title', { ns: 'ui' })}</h4>

      ${computationalBase > 0
        ? html`
            <div class="parameters-table">
              <span>
                ${t('statistics.growth.pointsByPrograms.computationalBase', { ns: 'ui' })}

                <sl-tooltip>
                  <span slot="content"> ${t('statistics.hints.computationalBase', { ns: 'ui' })} </span>

                  <sl-icon name="question-circle"></sl-icon>
                </sl-tooltip>
              </span>
              <span> ${formatter.formatNumberLong(computationalBase)} </span>
            </div>
          `
        : nothing}
    `;
  }
}
