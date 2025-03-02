import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { Feature } from '@shared/types';
import { statisticsPanelStyle } from '../../styles';
import { StatisticsGrowthPanelController } from './controller';

@customElement('ca-statistics-growth-panel')
export class StatisticsGrowthPanel extends BaseComponent<StatisticsGrowthPanelController> {
  static styles = statisticsPanelStyle;

  protected controller: StatisticsGrowthPanelController;

  constructor() {
    super();

    this.controller = new StatisticsGrowthPanelController(this);
  }

  renderContent() {
    return html`
      <ca-statistics-money-growth></ca-statistics-money-growth>

      <ca-statistics-development-growth></ca-statistics-development-growth>

      ${this.controller.isFeatureUnlocked(Feature.rewardsPoints)
        ? html`<ca-statistics-multiplier-points-growth type="rewards"></ca-statistics-multiplier-points-growth>`
        : nothing}
      ${this.controller.isFeatureUnlocked(Feature.connectivityPoints)
        ? html`<ca-statistics-multiplier-points-growth type="connectivity"></ca-statistics-multiplier-points-growth>`
        : nothing}
      ${this.controller.isFeatureUnlocked(Feature.codeBasePoints)
        ? html`<ca-statistics-multiplier-points-growth type="codeBase"></ca-statistics-multiplier-points-growth>`
        : nothing}
      ${this.controller.isFeatureUnlocked(Feature.computationalBasePoints)
        ? html`<ca-statistics-multiplier-points-growth
            type="computationalBase"
          ></ca-statistics-multiplier-points-growth>`
        : nothing}
    `;
  }
}
