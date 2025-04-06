import { PropertyValues, html, css } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { OverviewDevelopmentLevelProgressController } from './controller';
import { progressBlockStyle } from '../../styles';

@localized()
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

  private _progressBarRef = createRef<SlProgressBar>();
  private _hintRef = createRef<HTMLParagraphElement>();

  constructor() {
    super();

    this.controller = new OverviewDevelopmentLevelProgressController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <div class="block">
        <div class="title">${msg('Next development level progress')}</div>

        <sl-progress-bar ${ref(this._progressBarRef)}>
        </sl-progress-bar>

        <p ${ref(this._hintRef)} class="hint"></p>
      </div>
    `;
  }
  
  private handlePartialUpdate = () => {
    const formatter = this.controller.formatter;

    if (this._progressBarRef.value) {
      const currentDevelopmentLevelPoints = this.controller.getCurrentDevelopmentLevelPoints();
      const nextDevelopmentLevelPoints = this.controller.getNextDevelopmentLevelPoints();

      const nextDevelopmentLevelProgressBarValue =
        Math.max(currentDevelopmentLevelPoints / nextDevelopmentLevelPoints, 0) * 100;
      const nextDevelopmentLevelProgressBarPercentage = `${formatter.formatNumberFloat(nextDevelopmentLevelProgressBarValue)}%`;

      this._progressBarRef.value.value = nextDevelopmentLevelProgressBarValue;
      this._progressBarRef.value.textContent = nextDevelopmentLevelProgressBarPercentage;
    }

    const developmentGrowth = this.controller.getDevelopmentGrowth();

    if (this._hintRef.value) {
      if (developmentGrowth > 0) {
        const formattedTime = formatter.formatTimeShort(
          this.controller.getDevelopmentPointsUntilNextLevel() / developmentGrowth,
        );

        this._hintRef.value.textContent = msg(str`Next development level will be reached in ${formattedTime}`);
      } else {
        this._hintRef.value.textContent = msg('Next development level is not reachable');
      }
    }
  };
}
