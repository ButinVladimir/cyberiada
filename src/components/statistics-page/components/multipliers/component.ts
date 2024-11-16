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

    return html`
      <h4 class="title">
        <intl-message label="ui:statistics:general:multipliers:title">Multipliers and discounts</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:general:multipliers:programCompletionSpeed">
            Program completion speed
          </intl-message>
        </span>
        <span> ${formatter.formatNumberFloat(this.controller.programCompletionSpeedMultiplier)} </span>

        <span>
          <intl-message label="ui:statistics:general:multipliers:mainframeDiscount"> Mainframe discount </intl-message>
        </span>
        <span> ${formatter.formatNumberFloat(this.controller.mainframeDiscount * 100)} </span>
      </div>
    `;
  }
}
