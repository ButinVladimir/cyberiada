import { html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent, IncomeSource } from '@shared/index';
import { INCOME_SOURCE_NAMES, STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { StatisticsProcessCompletionSpeedController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-process-completion-speed')
export class StatisticsProcessCompletionSpeed extends BaseComponent {
  static styles = statisticsPanelContentStyle;

  private _controller: StatisticsProcessCompletionSpeedController;

  constructor() {
    super();

    this._controller = new StatisticsProcessCompletionSpeedController(this);
  }

  protected renderDesktop() {
    const formatter = this._controller.formatter;

    const { totalMultiplier, multiplierByHardware, multiplierByProgram } = this._controller;

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('Process completion speed multipliers')}</h4>

        <div class="parameters-table">
          <div>${msg('By hardware')}</div>
          <div>${formatter.formatNumberFloat(multiplierByHardware)}</div>

          <div>${INCOME_SOURCE_NAMES[IncomeSource.program]()}</div>
          <div>${formatter.formatNumberFloat(multiplierByProgram)}</div>

          <div>${STATISTIC_PAGE_TEXTS.total()}</div>
          <div>${formatter.formatNumberFloat(totalMultiplier)}</div>
        </div>
      </sl-details>
    `;
  }
}
