import { t } from 'i18next';
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

    return html`
      <h4 class="title">${t('statistics.income.pointsByPrograms.title', { ns: 'ui' })}</h4>

      <div class="parameters-table">
        <span>
          ${t('statistics.income.pointsByPrograms.codeBase', { ns: 'ui' })}

          <sl-tooltip>
            <span slot="content"> ${t('statistics.hints.codeBase', { ns: 'ui' })} </span>

            <sl-icon name="question-circle"></sl-icon>
          </sl-tooltip>
        </span>
        <span> ${formatter.formatNumberFloat(this.controller.codeBase)} </span>

        <span>
          ${t('statistics.income.pointsByPrograms.computationalBase', { ns: 'ui' })}

          <sl-tooltip>
            <span slot="content"> ${t('statistics.hints.computationalBase', { ns: 'ui' })} </span>

            <sl-icon name="question-circle"></sl-icon>
          </sl-tooltip>
        </span>
        <span> ${formatter.formatNumberFloat(this.controller.computationalBase)} </span>

        <span>
          ${t('statistics.income.pointsByPrograms.connectivity', { ns: 'ui' })}

          <sl-tooltip>
            <span slot="content"> ${t('statistics.hints.connectivity', { ns: 'ui' })} </span>

            <sl-icon name="question-circle"></sl-icon>
          </sl-tooltip>
        </span>
        <span> ${formatter.formatNumberFloat(this.controller.connectivity)} </span>

        <span>
          ${t('statistics.income.pointsByPrograms.reward', { ns: 'ui' })}

          <sl-tooltip>
            <span slot="content"> ${t('statistics.hints.reward', { ns: 'ui' })} </span>

            <sl-icon name="question-circle"></sl-icon>
          </sl-tooltip>
        </span>
        <span> ${formatter.formatNumberFloat(this.controller.rewards)} </span>
      </div>
    `;
  }
}
