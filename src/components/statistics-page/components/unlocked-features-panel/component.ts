import { t } from 'i18next';
import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { Feature } from '@shared/types';
import { StatisticsUnlockedFeaturesPanelController } from './controller';
import { sectionTitleStyle } from '@shared/styles';

@customElement('ca-statistics-unlocked-features-panel')
export class StatisticsUnlockedFeaturesPanel extends BaseComponent<StatisticsUnlockedFeaturesPanelController> {
  static styles = [
    sectionTitleStyle,
    css`
      h4.title {
        margin-bottom: var(--sl-spacing-2x-small);
      }

      .parameters-table {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--sl-spacing-3x-small);
      }
    `,
  ];

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
