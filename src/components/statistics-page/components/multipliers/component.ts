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
      <h4 class="title">
        <intl-message label="ui:statistics:general:multipliers:title">Multipliers and discounts</intl-message>
      </h4>

      <div class="parameters-table">
        ${programCompletionSpeedMultiplier > 1
          ? html`
              <span>
                <intl-message label="ui:statistics:general:multipliers:programCompletionSpeed">
                  Program completion speed
                </intl-message>
              </span>
              <span> ${formatter.formatNumberFloat(programCompletionSpeedMultiplier)} </span>
            `
          : null}
        ${mainframeDiscount > 0
          ? html`
              <span>
                <intl-message label="ui:statistics:general:multipliers:mainframeDiscount">
                  Mainframe discount
                </intl-message>

                <sl-tooltip>
                  <intl-message slot="content" label="ui:statistics:hints:mainframeDiscount">
                    Mainframe discount hint
                  </intl-message>

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
