import { t } from 'i18next';
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsProgramCompletionSpeedController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

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

    const { totalMultiplier, multiplierByHardware, multiplierByProgram } = this.controller;

    return html`
      <h4 class="title">${t('statistics.general.programCompletionSpeed.title', { ns: 'ui' })}</h4>

      <div class="parameters-table">
        ${multiplierByHardware > 1
          ? html`
              <span> ${t('statistics.general.programCompletionSpeed.multiplierByHardware', { ns: 'ui' })} </span>
              <span> ${formatter.formatNumberFloat(multiplierByHardware)} </span>
            `
          : nothing}
        ${multiplierByProgram > 1
          ? html`
              <span> ${t('statistics.general.programCompletionSpeed.multiplierByProgram', { ns: 'ui' })} </span>
              <span> ${formatter.formatNumberFloat(multiplierByProgram)} </span>
            `
          : nothing}

        <span> ${t('statistics.total', { ns: 'ui' })} </span>
        <span> ${formatter.formatNumberFloat(totalMultiplier)} </span>
      </div>
    `;
  }
}
