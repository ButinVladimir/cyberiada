import { t } from 'i18next';
import { html, nothing } from 'lit';
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
      <h4 class="title">${t('statistics.income.pointsByPrograms.title', { ns: 'ui' })}</h4>

      <div class="parameters-table">
        ${computationalBase > 1
          ? html`
              <span>
                ${t('statistics.income.pointsByPrograms.computationalBase', { ns: 'ui' })}

                <sl-tooltip>
                  <span slot="content"> ${t('statistics.hints.computationalBase', { ns: 'ui' })} </span>

                  <sl-icon name="question-circle"></sl-icon>
                </sl-tooltip>
              </span>
              <span> ${formatter.formatNumberLong(this.controller.computationalBase)} </span>
            `
          : nothing}
      </div>
    `;
  }
}
