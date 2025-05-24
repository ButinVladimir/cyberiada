import { html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IncomeSource } from '@shared/types';
import { INCOME_SOURCE_NAMES, STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { StatisticsExperienceShareController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-experience-share')
export class StatisticsExperienceShare extends BaseComponent {
  static styles = statisticsPanelContentStyle;

  private _controller: StatisticsExperienceShareController;

  constructor() {
    super();

    this._controller = new StatisticsExperienceShareController(this);
  }

  render() {
    const formatter = this._controller.formatter;

    const { totalMultiplier, multiplierBySynchronization, multiplierByProgram } = this._controller;

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('Shared experience multipliers')}</h4>

        <div class="parameters-table">
          <span> ${msg('By synchronization')} </span>
          <span> ${formatter.formatNumberFloat(multiplierBySynchronization)} </span>

          <span> ${INCOME_SOURCE_NAMES[IncomeSource.program]()} </span>
          <span> ${formatter.formatNumberFloat(multiplierByProgram)} </span>

          <span> ${STATISTIC_PAGE_TEXTS.total()} </span>
          <span> ${formatter.formatNumberFloat(totalMultiplier)} </span>
        </div>
      </sl-details>
    `;
  }
}
