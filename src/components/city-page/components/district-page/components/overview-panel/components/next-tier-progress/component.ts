import { html, css, nothing } from 'lit';
import { localized, msg } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import { consume } from '@lit/context';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseComponent } from '@shared/base-component';
import { progressBarHintStyle } from '@shared/styles';
import { calculateLevelProgressPercentage } from '@shared/helpers';
import { CityDistrictOverviewPanelNextTierProgressController } from './controller';
import { districtIndexContext } from '../../../../contexts';

@localized()
@customElement('ca-city-district-overview-panel-next-tier-progress')
export class CityDistrictOverviewPanelNextTierProgress extends BaseComponent {
  static styles = [
    progressBarHintStyle,
    css`
      :host {
        display: block;
      }

      div.title {
        font-size: var(--sl-font-size-small);
        line-height: var(--sl-line-height-dense);
        margin-bottom: var(--sl-spacing-2x-small);
      }

      sl-progress-bar {
        --height: var(--sl-spacing-2x-large);
      }
    `,
  ];

  hasPartialUpdate = true;

  @consume({ context: districtIndexContext, subscribe: true })
  private _districtIndex?: number;

  private _controller: CityDistrictOverviewPanelNextTierProgressController;

  private _progressBarRef = createRef<SlProgressBar>();
  private _hintRef = createRef<HTMLParagraphElement>();
  private _timerRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this._controller = new CityDistrictOverviewPanelNextTierProgressController(this);
  }

  render() {
    if (this._districtIndex === undefined) {
      return nothing;
    }

    return html`
      <div class="title">${msg('Next district tier progress')}</div>

      <sl-progress-bar ${ref(this._progressBarRef)}> </sl-progress-bar>

      <p ${ref(this._hintRef)} class="progress-bar-hint">
        ${msg(html`Next district tier will be reached in ${html`<span ${ref(this._timerRef)}></span>`}`)}
      </p>
    `;
  }

  handlePartialUpdate = () => {
    if (this._districtIndex === undefined) {
      return;
    }

    const formatter = this._controller.formatter;
    const currentPoints = this._controller.getDistrictTierPoints(this._districtIndex);
    const nexTierRequirements = this._controller.getNextTierRequirements(this._districtIndex);

    if (this._progressBarRef.value) {
      const nextDevelopmentLevelProgressBarValue = calculateLevelProgressPercentage(
        this._controller.getCurrentTierRequirements(this._districtIndex),
        currentPoints,
        nexTierRequirements,
      );

      this._progressBarRef.value.value = nextDevelopmentLevelProgressBarValue;
    }

    const developmentGrowth = this._controller.getDistrictTierGrowth(this._districtIndex);

    if (this._hintRef.value) {
      if (developmentGrowth > 0) {
        this._hintRef.value.classList.add('visible');
      } else {
        this._hintRef.value.classList.remove('visible');
      }
    }

    if (this._timerRef.value && developmentGrowth > 0) {
      const formattedTime = formatter.formatTimeLong((nexTierRequirements - currentPoints) / developmentGrowth);

      this._timerRef.value.textContent = formattedTime;
    }
  };
}
