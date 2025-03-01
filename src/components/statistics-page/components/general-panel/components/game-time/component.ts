import { t } from 'i18next';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsGameTimeController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@customElement('ca-statistics-game-time')
export class StatisticsGameTime extends BaseComponent<StatisticsGameTimeController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsGameTimeController;

  constructor() {
    super();

    this.controller = new StatisticsGameTimeController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${t('statistics.general.gameTime.title', { ns: 'ui' })}</h4>

        <div class="parameters-table">
          <span> ${t('statistics.general.gameTime.timeThisRun', { ns: 'ui' })} </span>
          <span> ${formatter.formatTimeShort(this.controller.gameTime)} </span>

          <span> ${t('statistics.general.gameTime.timeTotal', { ns: 'ui' })} </span>
          <span> ${formatter.formatTimeShort(this.controller.gameTimeTotal)} </span>
        </div>
      </sl-details>
    `;
  }
}
