import { html, css } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { Feature } from '@shared/types';
import { HINT_ICON, hintIconStyle } from '@shared/styles';
import { UNLOCKED_FEATURE_TEXTS } from '@texts/unlocked-features';
import { OverviewUnlockedFeaturesPanelController } from './controller';

@localized()
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
      return html`${msg('No features has been unlocked yet')}`;
    }

    return html`
      <ul class="features-list">
        ${repeat(features, (feature) => feature, this.renderFeature)}
      </ul>
    `;
  }

  private renderFeature = (feature: Feature) => html`
    <li>
      ${UNLOCKED_FEATURE_TEXTS[feature].title()}

      <sl-tooltip>
        <span slot="content"> ${UNLOCKED_FEATURE_TEXTS[feature].hint()} </span>

        <sl-icon name=${HINT_ICON}></sl-icon>
      </sl-tooltip>
    </li>
  `;
}
