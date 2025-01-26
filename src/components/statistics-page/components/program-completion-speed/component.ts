import { t } from 'i18next';
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
      <h4 class="title">${t('statistics.growth.programCompletionSpeed.title', { ns: 'ui' })}</h4>

      <div class="parameters-table">
        <span> ${t('statistics.growth.programCompletionSpeed.pointsPerSecond', { ns: 'ui' })} </span>
        <span> ${formatter.formatNumberFloat(this.controller.programCompletionSpeed)} </span>
      </div>
    `;
  }
}
