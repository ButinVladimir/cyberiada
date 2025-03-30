import { t } from 'i18next';
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsRewardsController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@customElement('ca-statistics-rewards')
export class StatisticsRewards extends BaseComponent<StatisticsRewardsController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsRewardsController;

  constructor() {
    super();

    this.controller = new StatisticsRewardsController(this);
  }

  render() {
    const formatter = this.controller.formatter;

    const multiplierByProgram = this.controller.getMultiplierByProgram();

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${t(`statistics.general.rewards.title`, { ns: 'ui' })}</h4>

        <div class="parameters-table">
          ${multiplierByProgram > 1
            ? html`
                <span> ${t(`statistics.general.rewards.multiplierByProgram`, { ns: 'ui' })} </span>
                <span> ${formatter.formatNumberFloat(multiplierByProgram)} </span>
              `
            : nothing}
        </div>
      </sl-details>
    `;
  }
}
