import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { Feature } from '@shared/types';
import { statisticsPanelStyle } from '../../styles';
import { StatisticsIncomePanelController } from './controller';

@customElement('ca-statistics-income-panel')
export class StatisticsIncomePanel extends BaseComponent<StatisticsIncomePanelController> {
  static styles = statisticsPanelStyle;

  protected controller: StatisticsIncomePanelController;

  constructor() {
    super();

    this.controller = new StatisticsIncomePanelController(this);
  }

  render() {
    return html`
      <ca-statistics-money-income></ca-statistics-money-income>

      <ca-statistics-development-income></ca-statistics-development-income>

      ${this.controller.isFeatureUnlocked(Feature.companyManagement)
        ? html`<ca-statistics-district-tier-points-income></ca-statistics-district-tier-points-income>`
        : nothing}
      ${this.controller.isFeatureUnlocked(Feature.connectivity)
        ? html`<ca-statistics-connectivity-points-income></ca-statistics-connectivity-points-income>`
        : nothing}
      ${this.controller.isFeatureUnlocked(Feature.rewardsPoints)
        ? html`<ca-statistics-multiplier-points-income type="rewards"></ca-statistics-multiplier-points-income>`
        : nothing}
      ${this.controller.isFeatureUnlocked(Feature.codeBasePoints)
        ? html`<ca-statistics-multiplier-points-income type="codeBase"></ca-statistics-multiplier-points-income>`
        : nothing}
      ${this.controller.isFeatureUnlocked(Feature.computationalBasePoints)
        ? html`<ca-statistics-multiplier-points-income
            type="computationalBase"
          ></ca-statistics-multiplier-points-income>`
        : nothing}
    `;
  }
}
