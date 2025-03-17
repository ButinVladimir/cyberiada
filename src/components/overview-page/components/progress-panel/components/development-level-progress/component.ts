import { t } from 'i18next';
import { html, nothing, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { OverviewDevelopmentLevelProgressController } from './controller';
import { progressBlockStyle } from '../../styles';

@customElement('ca-overview-development-level-progress')
export class OverviewDevelopmentLevelProgress extends BaseComponent<OverviewDevelopmentLevelProgressController> {
  static styles = [
    progressBlockStyle,
    hintStyle,
    css`
      p.hint {
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
      }
    `,
  ];

  protected controller: OverviewDevelopmentLevelProgressController;

  constructor() {
    super();

    this.controller = new OverviewDevelopmentLevelProgressController(this);
  }

  render() {
    const formatter = this.controller.formatter;

    const currentDevelopmentLevelPoints = this.controller.getCurrentDevelopmentLevelPoints();
    const nextDevelopmentLevelPoints = this.controller.getNextDevelopmentLevelPoints();

    const nextDevelopmentLevelProgressBarValue =
      Math.max(currentDevelopmentLevelPoints / nextDevelopmentLevelPoints, 0) * 100;
    const nextDevelopmentLevelProgressBarPercentage = `${formatter.formatNumberFloat(nextDevelopmentLevelProgressBarValue)}%`;

    return html`
      <div class="block">
        <div class="title">${t('overview.progress.nextDevelopmentLevelProgress', { ns: 'ui' })}</div>

        <sl-progress-bar value=${nextDevelopmentLevelProgressBarValue}>
          ${nextDevelopmentLevelProgressBarPercentage}
        </sl-progress-bar>

        ${this.renderHint()}
      </div>
    `;
  }

  private renderHint = () => {
    const developmentGrowth = this.controller.getDevelopmentGrowth();
    const formatter = this.controller.formatter;

    if (developmentGrowth > 0) {
      const formattedTime = formatter.formatTimeShort(
        this.controller.getDevelopmentPointsUntilNextLevel() / developmentGrowth,
      );

      return html`<p class="hint">
        ${t(`overview.progress.nextLevelReachedIn`, {
          ns: 'ui',
          time: formattedTime,
        })}
      </p>`;
    }

    return nothing;
  };
}
