import { t } from 'i18next';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsGeneralPanelController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-general-panel')
export class StatisticsGeneralPanel extends BaseComponent<StatisticsGeneralPanelController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsGeneralPanelController;

  constructor() {
    super();

    this.controller = new StatisticsGeneralPanelController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    return html`
      <h4 class="title">${t('statistics.general.time.title', { ns: 'ui' })}</h4>

      <div class="parameters-table">
        <span> ${t('statistics.general.time.timeThisRun', { ns: 'ui' })} </span>
        <span> ${formatter.formatTimeShort(this.controller.gameTime)} </span>

        <span> ${t('statistics.general.time.timeTotal', { ns: 'ui' })} </span>
        <span> ${formatter.formatTimeShort(this.controller.gameTimeTotal)} </span>
      </div>

      <ca-statistics-multipliers></ca-statistics-multipliers>
    `;
  }
}
