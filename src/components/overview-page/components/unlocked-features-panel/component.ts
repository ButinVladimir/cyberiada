import { t } from 'i18next';
import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { Feature } from '@shared/types';
import { hintIconStyle } from '@shared/styles';
import { OverviewUnlockedFeaturesPanelController } from './controller';

@customElement('ca-overview-unlocked-features-panel')
export class OverviewUnlockedFeaturesPanel extends BaseComponent<OverviewUnlockedFeaturesPanelController> {
  static styles = [
    hintIconStyle,
    css`
      ul.features-list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--sl-spacing-3x-small);
        list-style: none;
        padding: 0;
        margin: 0;
      }
    `,
  ];

  protected controller: OverviewUnlockedFeaturesPanelController;

  constructor() {
    super();

    this.controller = new OverviewUnlockedFeaturesPanelController(this);
  }

  render() {
    const features = this.controller.listUnlockedFeatures();

    if (features.length === 0) {
      return html`${t('overview.unlockedFeatures.noFeatures', { ns: 'ui' })}`;
    }

    return html`
      <ul class="features-list">
        ${repeat(features, (feature) => feature, this.renderFeature)}
      </ul>
    `;
  }

  private renderFeature = (feature: Feature) => html`
    <li>
      ${t(`${feature}.title`, { ns: 'features' })}

      <sl-tooltip>
        <span slot="content"> ${t(`${feature}.hint`, { ns: 'features' })} </span>

        <sl-icon name="question-circle"></sl-icon>
      </sl-tooltip>
    </li>
  `;
}
