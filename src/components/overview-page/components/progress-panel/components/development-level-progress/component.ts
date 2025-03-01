import { t } from 'i18next';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { OverviewDevelopmentLevelProgressController } from './controller';
import { progressBlockStyle } from '../../styles';

@customElement('ca-overview-development-level-progress')
export class OverviewDevelopmentLevelProgress extends BaseComponent<OverviewDevelopmentLevelProgressController> {
  static styles = [progressBlockStyle];

  protected controller: OverviewDevelopmentLevelProgressController;

  constructor() {
    super();

    this.controller = new OverviewDevelopmentLevelProgressController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    const currentDevelopmentLevelPoints = this.controller.getCurrentDevelopmentLevelPoints();
    const nextDevelopmentLevelPoints = this.controller.getNextDevelopmentLevelPoints();

    const nextDevelopmentLevelProgressBarValue = (currentDevelopmentLevelPoints / nextDevelopmentLevelPoints) * 100;
    const nextDevelopmentLevelProgressBarPercentage = `${formatter.formatNumberFloat(nextDevelopmentLevelProgressBarValue)}%`;

    const developmentGrowth = this.controller.getDevelopmentGrowth();
    let timeUntilNextLevel = '';
    let developmentLabel = 'nextLevelNotReachable';

    if (developmentGrowth > 0) {
      timeUntilNextLevel = formatter.formatTimeShort(
        this.controller.getDevelopmentPointsUntilNextLevel() / developmentGrowth,
      );
      developmentLabel = 'nextLevelReachedIn';
    }

    return html`
      <div class="block">
        <div class="title">${t('overview.progress.nextDevelopmentLevelProgress', { ns: 'ui' })}</div>

        <sl-tooltip>
          <span slot="content">
            ${t(`overview.progress.${developmentLabel}`, { ns: 'ui', time: timeUntilNextLevel })}
          </span>

          <sl-progress-bar value=${nextDevelopmentLevelProgressBarValue}>
            ${nextDevelopmentLevelProgressBarPercentage}
          </sl-progress-bar>
        </sl-tooltip>
      </div>
    `;
  }
}
