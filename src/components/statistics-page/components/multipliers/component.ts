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
    const mainframeDiscount = this.controller.mainframeDiscount * 100;

    return html`
      <h4 class="title">${t('statistics.general.multipliers.title', { ns: 'ui' })}</h4>

      <div class="parameters-table">
        ${programCompletionSpeedMultiplier > 1
          ? html`
              <span> ${t('statistics.general.multipliers.programCompletionSpeed', { ns: 'ui' })} </span>
              <span> ${formatter.formatNumberFloat(programCompletionSpeedMultiplier)} </span>
            `
          : null}
        ${mainframeDiscount > 0
          ? html`
              <span>
                ${t('statistics.general.multipliers.mainframeDiscount', { ns: 'ui' })}

                <sl-tooltip>
                  <span slot="content"> ${t('statistics.hints.mainframeDiscount', { ns: 'ui' })} </span>

                  <sl-icon name="question-circle"></sl-icon>
                </sl-tooltip>
              </span>
              <span> ${formatter.formatNumberFloat(mainframeDiscount)} </span>
            `
          : null}
      </div>
    `;
  }
}
