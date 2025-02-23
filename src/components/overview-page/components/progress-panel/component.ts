import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { OverviewProgressPanelController } from './controller';

@customElement('ca-overview-progress-panel')
export class OverviewProgressPanel extends BaseComponent<OverviewProgressPanelController> {
  static styles = [
    css`
      div.block div.title {
        font-size: var(--sl-font-size-small);
        line-height: var(--sl-line-height-dense);   
        margin-bottom: var(--sl-spacing-2x-small);
      }

      div.block sl-progress-bar {
        --height: var(--sl-spacing-2x-large);
      }

      div.block sl-progress-bar::part(label) {
        font-size: var(--sl-font-size-medium);
      }
    `,
  ];

  protected controller: OverviewProgressPanelController;

  constructor() {
    super();

    this.controller = new OverviewProgressPanelController(this);
  }

  renderContent() {
    return html`
      ${this.renderNextDevelopmentLevelProgressBar()}
    `;
  }

  private renderNextDevelopmentLevelProgressBar = () => {
    const formatter = this.controller.formatter;

    const currentDevelopmentLevelPoints = this.controller.getCurrentDevelopmentLevelPoints();
    const nextDevelopmentLevelPoints = this.controller.getNextDevelopmentLevelPoints();

    const nextDevelopmentLevelProgressBarValue = currentDevelopmentLevelPoints / nextDevelopmentLevelPoints * 100;
    const nextDevelopmentLevelProgressBarPercentage = `${formatter.formatNumberFloat(nextDevelopmentLevelProgressBarValue)}%`;

    const developmentGrowth = this.controller.getDevelopmentGrowth();
    let timeUntilNextLevel = '';
    let developmentLabel = 'nextLevelNotReachable';

    if (developmentGrowth > 0) {
      timeUntilNextLevel = formatter.formatTimeShort(this.controller.getDevelopmentPointsUntilNextLevel() / developmentGrowth);
      developmentLabel = 'nextLevelReachedIn';
    }

    return html`
      <div class="block">
        <div class="title">${t('overview.progress.nextDevelopmentLevelProgress', { ns: 'ui' })}</div>

        <sl-tooltip>
          <span slot="content"> ${t(`overview.progress.${developmentLabel}`, { ns: 'ui', time: timeUntilNextLevel })} </span>

          <sl-progress-bar value=${nextDevelopmentLevelProgressBarValue}>
            ${nextDevelopmentLevelProgressBarPercentage}
          </sl-progress-bar>
        </sl-tooltip>
      </div>
    `; 
  }
}
