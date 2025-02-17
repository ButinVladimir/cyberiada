import { t } from 'i18next';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsMultipliersController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-multipliers')
export class StatisticsMultipliers extends BaseComponent<StatisticsMultipliersController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsMultipliersController;

  constructor() {
    super();

    this.controller = new StatisticsMultipliersController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    const programCompletionSpeedMultiplier = this.controller.programCompletionSpeedMultiplier;
    const mainframeProgramCostMultiplier = this.controller.mainframeProgramCostMultiplier * 100;
    const mainframeHardwareCostMultiplier = this.controller.mainframeHardwareCostMultiplier * 100;
    const overallCostMultiplier = this.controller.overallCostMultiplier * 100;
    const rewardsMultiplier = this.controller.rewardsMultiplier * 100;

    return html`
      <h4 class="title">${t('statistics.general.multipliers.title', { ns: 'ui' })}</h4>

      <div class="parameters-table">
        <span> ${t('statistics.general.multipliers.programCompletionSpeed', { ns: 'ui' })} </span>
        <span> ${formatter.formatNumberFloat(programCompletionSpeedMultiplier)} </span>

        <span>
          ${t('statistics.general.multipliers.mainframeHardwareCostMultiplier', { ns: 'ui' })}

          <sl-tooltip>
            <span slot="content"> ${t('statistics.hints.computationalBase', { ns: 'ui' })} </span>

            <sl-icon name="question-circle"></sl-icon>
          </sl-tooltip>
        </span>
        <span> ${formatter.formatNumberFloat(mainframeHardwareCostMultiplier)} </span>

        <span>
          ${t('statistics.general.multipliers.mainframeProgramsCostMultiplier', { ns: 'ui' })}

          <sl-tooltip>
            <span slot="content"> ${t('statistics.hints.codeBase', { ns: 'ui' })} </span>

            <sl-icon name="question-circle"></sl-icon>
          </sl-tooltip>
        </span>
        <span> ${formatter.formatNumberFloat(mainframeProgramCostMultiplier)} </span>

        <span>
          ${t('statistics.general.multipliers.overallCostMultiplier', { ns: 'ui' })}

          <sl-tooltip>
            <span slot="content"> ${t('statistics.hints.connectivity', { ns: 'ui' })} </span>

            <sl-icon name="question-circle"></sl-icon>
          </sl-tooltip>
        </span>
        <span> ${formatter.formatNumberFloat(overallCostMultiplier)} </span>

        <span>
          ${t('statistics.general.multipliers.rewardsMultilplier', { ns: 'ui' })}

          <sl-tooltip>
            <span slot="content"> ${t('statistics.hints.rewards', { ns: 'ui' })} </span>

            <sl-icon name="question-circle"></sl-icon>
          </sl-tooltip>
        </span>
        <span> ${formatter.formatNumberFloat(rewardsMultiplier)} </span>
      </div>
    `;
  }
}
