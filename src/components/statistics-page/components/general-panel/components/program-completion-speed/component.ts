import { html, nothing } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsProgramCompletionSpeedController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-program-completion-speed')
export class StatisticsProgramCompletionSpeed extends BaseComponent<StatisticsProgramCompletionSpeedController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsProgramCompletionSpeedController;

  constructor() {
    super();

    this.controller = new StatisticsProgramCompletionSpeedController(this);
  }

  render() {
    const formatter = this.controller.formatter;

    const { totalMultiplier, multiplierByHardware, multiplierByProgram } = this.controller;

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('Process completion speed')}</h4>

        <div class="parameters-table">
          ${multiplierByHardware > 1
            ? html`
                <span> ${msg('Hardware multiplier')} </span>
                <span> ${formatter.formatNumberFloat(multiplierByHardware)} </span>
              `
            : nothing}
          ${multiplierByProgram > 1
            ? html`
                <span> ${msg('Multiplier by "Predictive computator" program')} </span>
                <span> ${formatter.formatNumberFloat(multiplierByProgram)} </span>
              `
            : nothing}

          <span> ${msg('Total')} </span>
          <span> ${formatter.formatNumberFloat(totalMultiplier)} </span>
        </div>
      </sl-details>
    `;
  }
}
