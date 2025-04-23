import { html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCE_NAMES, STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { StatisticsProgramCompletionSpeedController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-program-completion-speed')
export class StatisticsProgramCompletionSpeed extends BaseComponent<StatisticsProgramCompletionSpeedController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsProgramCompletionSpeedController;

  constructor() {
    super();

    this.controller = new StatisticsProgramCompletionSpeedController(this);
  }

  render() {
    const formatter = this.controller.formatter;

    const { totalMultiplier, multiplierByHardware, multiplierByProgram } = this.controller;

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('Process completion speed multipliers')}</h4>

        <div class="parameters-table">
          <span> ${msg('By hardware')} </span>
          <span> ${formatter.formatNumberFloat(multiplierByHardware)} </span>

          <span> ${INCOME_SOURCE_NAMES[IncomeSource.program]()} </span>
          <span> ${formatter.formatNumberFloat(multiplierByProgram)} </span>

          <span> ${STATISTIC_PAGE_TEXTS.total()} </span>
          <span> ${formatter.formatNumberFloat(totalMultiplier)} </span>
        </div>
      </sl-details>
    `;
  }
}
