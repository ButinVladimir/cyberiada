import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { Feature } from '@shared/types';
import { StatisticsGeneralPanelController } from './controller';
import { statisticsPanelStyle } from '../../styles';

@customElement('ca-statistics-general-panel')
export class StatisticsGeneralPanel extends BaseComponent {
  static styles = statisticsPanelStyle;

  private _controller: StatisticsGeneralPanelController;

  constructor() {
    super();

    this._controller = new StatisticsGeneralPanelController(this);
  }

  render() {
    return html`
      <ca-statistics-game-time></ca-statistics-game-time>

      <ca-statistics-process-completion-speed></ca-statistics-process-completion-speed>

      ${this._controller.isFeatureUnlocked(Feature.experienceShare)
        ? html`<ca-statistics-experience-share></ca-statistics-experience-share>`
        : nothing}
      ${this._controller.isFeatureUnlocked(Feature.companyManagement)
        ? html`<ca-statistics-synchronization></ca-statistics-synchronization>`
        : nothing}
      ${this._controller.isFeatureUnlocked(Feature.connectivity)
        ? html`<ca-statistics-connectivity></ca-statistics-connectivity>`
        : nothing}
      ${this._controller.isFeatureUnlocked(Feature.mainframePrograms)
        ? html`<ca-statistics-multipliers type="mainframeProgramsCostDivisors"></ca-statistics-multipliers>`
        : nothing}
      ${this._controller.isFeatureUnlocked(Feature.mainframeHardware)
        ? html`<ca-statistics-multipliers type="mainframeHardwareCostDivisors"></ca-statistics-multipliers>`
        : nothing}
      ${this._controller.isFeatureUnlocked(Feature.rewards)
        ? html`<ca-statistics-multipliers type="rewards"></ca-statistics-multipliers>`
        : nothing}
    `;
  }
}
