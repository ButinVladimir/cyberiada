import { t } from 'i18next';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { Feature } from '@shared/types';
import { StatisticsUnlockedFeaturesPanelController } from './controller';
import { statisticsPanelContentStyle } from '../../styles';

@customElement('ca-statistics-unlocked-features-panel')
export class StatisticsUnlockedFeaturesPanel extends BaseComponent<StatisticsUnlockedFeaturesPanelController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsUnlockedFeaturesPanelController;

  constructor() {
    super();

    this.controller = new StatisticsUnlockedFeaturesPanelController(this);
  }

  renderContent() {
    const features = this.controller.listUnlockedFeatures();

    return html`
      <h4 class="title">${t('statistics.unlockedFeatures.title', { ns: 'ui' })}</h4>

      <div class="parameters-table">${repeat(features, (feature) => feature, this.renderFeature)}</div>
    `;
  }

  private renderFeature = (feature: Feature) => html`
    <span> ${t(feature, { ns: 'features' })} </span>
    <span></span>
  `;
}
