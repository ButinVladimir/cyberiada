import { html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent, Feature, HINT_ICON } from '@shared/index';
import { UNLOCKED_FEATURE_TEXTS } from '@texts/index';
import { OverviewUnlockedFeaturesPanelController } from './controller';
import styles from './styles';

@localized()
@customElement('ca-overview-unlocked-features-panel')
export class OverviewUnlockedFeaturesPanel extends BaseComponent {
  static styles = styles;

  private _controller: OverviewUnlockedFeaturesPanelController;

  constructor() {
    super();

    this._controller = new OverviewUnlockedFeaturesPanelController(this);
  }

  protected renderDesktop() {
    const features = this._controller.listUnlockedFeatures();

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
