import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsGeneralPanelController } from './controller';
import { statisticsPanelStyle } from '../../styles';

@customElement('ca-statistics-general-panel')
export class StatisticsGeneralPanel extends BaseComponent<StatisticsGeneralPanelController> {
  static styles = statisticsPanelStyle;

  protected controller: StatisticsGeneralPanelController;

  constructor() {
    super();

    this.controller = new StatisticsGeneralPanelController(this);
  }

  renderContent() {
    return html`
      <ca-statistics-game-time></ca-statistics-game-time>

      <ca-statistics-program-completion-speed></ca-statistics-program-completion-speed>

      <ca-statistics-multipliers type="rewards"></ca-statistics-multipliers>

      <ca-statistics-multipliers type="overallCostDivisors"></ca-statistics-multipliers>

      <ca-statistics-multipliers type="mainframeHardwareCostDivisors"></ca-statistics-multipliers>

      <ca-statistics-multipliers type="mainframeProgramsCostDivisors"></ca-statistics-multipliers>
    `;
  }
}
