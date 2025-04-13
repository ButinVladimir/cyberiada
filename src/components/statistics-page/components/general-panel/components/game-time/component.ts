import { html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsGameTimeController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-game-time')
export class StatisticsGameTime extends BaseComponent<StatisticsGameTimeController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsGameTimeController;

  constructor() {
    super();

    this.controller = new StatisticsGameTimeController(this);
  }

  render() {
    const formatter = this.controller.formatter;

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('In-game passed time')}</h4>

        <div class="parameters-table">
          <span> ${msg('Since arrival to the city')} </span>
          <span> ${formatter.formatTimeShort(this.controller.gameTime)} </span>

          <span> ${msg('Total time')} </span>
          <span> ${formatter.formatTimeShort(this.controller.gameTimeTotal)} </span>
        </div>
      </sl-details>
    `;
  }
}
