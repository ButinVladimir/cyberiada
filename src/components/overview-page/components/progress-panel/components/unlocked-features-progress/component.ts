import { html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { FEATURES } from '@shared/constants';
import { calculateLevelProgressPercentage } from '@shared/helpers';
import { OverviewUnlockedFeaturesProgressController } from './controller';
import { progressBlockStyle } from '../../styles';

@localized()
@customElement('ca-overview-unlocked-features-progress')
export class OverviewUnlockedFeaturesProgress extends BaseComponent {
  static styles = [progressBlockStyle];

  private _controller: OverviewUnlockedFeaturesProgressController;

  constructor() {
    super();

    this._controller = new OverviewUnlockedFeaturesProgressController(this);
  }

  render() {
    const formatter = this._controller.formatter;

    const unlockedFeaturesCount = this._controller.getUnlockedFeaturesCount();
    const unlockedFeaturesMaxCount = FEATURES.length;

    const formattedCount = formatter.formatNumberDecimal(unlockedFeaturesCount);
    const formattedMaxCount = formatter.formatNumberDecimal(unlockedFeaturesMaxCount);

    const unlockedFeaturesProgressBarValue = calculateLevelProgressPercentage(
      0,
      unlockedFeaturesCount,
      unlockedFeaturesMaxCount,
    );
    const unlockedFeaturesProgressBarPercentage = `${formattedCount}/${formattedMaxCount}`;

    return html`
      <div class="block">
        <div class="title">${msg('Unlocked features progress')}</div>

        <sl-progress-bar value=${unlockedFeaturesProgressBarValue}>
          ${unlockedFeaturesProgressBarPercentage}
        </sl-progress-bar>
      </div>
    `;
  }
}
