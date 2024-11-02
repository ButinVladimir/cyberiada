import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StatisticsMultipliersController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-multipliers')
export class StatisticsMultipliers extends LitElement {
  static styles = statisticsPanelContentStyle;

  private _statisticsGeneralPanelController: StatisticsMultipliersController;

  constructor() {
    super();

    this._statisticsGeneralPanelController = new StatisticsMultipliersController(this);
  }

  render() {
    const formatter = this._statisticsGeneralPanelController.formatter;

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
        <span>
          ${formatter.formatNumberFloat(this._statisticsGeneralPanelController.programCompletionSpeedMultiplier)}
        </span>

        <span>
          <intl-message label="ui:statistics:general:multipliers:programDiscount"> Program discount </intl-message>
        </span>
        <span> ${formatter.formatNumberFloat(this._statisticsGeneralPanelController.mainframeDiscount)} </span>
      </div>
    `;
  }
}
