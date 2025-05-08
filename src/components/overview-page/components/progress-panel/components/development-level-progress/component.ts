import { html, css } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { calculateLevelProgressPercentage } from '@shared/helpers';
import { OverviewDevelopmentLevelProgressController } from './controller';
import { progressBlockStyle } from '../../styles';

@localized()
@customElement('ca-overview-development-level-progress')
export class OverviewDevelopmentLevelProgress extends BaseComponent {
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

  hasPartialUpdate = true;

  private _controller: OverviewDevelopmentLevelProgressController;

  private _progressBarRef = createRef<SlProgressBar>();
  private _hintRef = createRef<HTMLParagraphElement>();

  constructor() {
    super();

    this._controller = new OverviewDevelopmentLevelProgressController(this);
  }

  render() {
    return html`
      <div class="block">
        <div class="title">${msg('Next development level progress')}</div>

        <sl-progress-bar ${ref(this._progressBarRef)}> </sl-progress-bar>

        <p ${ref(this._hintRef)} class="hint"></p>
      </div>
    `;
  }

  handlePartialUpdate = () => {
    const formatter = this._controller.formatter;

    if (this._progressBarRef.value) {
      const nextDevelopmentLevelProgressBarValue = calculateLevelProgressPercentage(
        this._controller.getPrevDevelopmentLevelPoints(),
        this._controller.getCurrentDevelopmentPoints(),
        this._controller.getNextDevelopmentLevelPoints(),
      );

      this._progressBarRef.value.value = nextDevelopmentLevelProgressBarValue;
    }

    const developmentGrowth = this._controller.getDevelopmentGrowth();

    if (this._hintRef.value) {
      if (developmentGrowth > 0) {
        const formattedTime = formatter.formatTimeShort(
          this._controller.getDevelopmentPointsUntilNextLevel() / developmentGrowth,
        );

        this._hintRef.value.textContent = msg(str`Next development level will be reached in ${formattedTime}`);
      } else {
        this._hintRef.value.textContent = msg('Next development level is not reachable');
      }
    }
  };
}
