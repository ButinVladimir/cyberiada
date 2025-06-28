import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { localized, msg } from '@lit/localize';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseComponent, calculateLevelProgressPercentage, progressBarHintStyle } from '@shared/index';
import { type SidejobName } from '@state/company-state';
import { CityDistrictSidejobsListItemUnlockProgressController } from './controller';
import { consume } from '@lit/context';
import { sidejobNameContext } from '../sidejobs-list-item/contexts';
import { districtIndexContext } from '../../../../contexts';

@localized()
@customElement('ca-city-district-sidejobs-list-item-unlock-progress')
export class CityDistrictSidejobsListItemUnlockProgress extends BaseComponent {
  static styles = [
    progressBarHintStyle,
    css`
      :host {
        flex: 1 1 auto;
      }

      .progress-bar-content {
        display: none;
      }

      .progress-bar-content.visible {
        display: block;
      }
    `,
  ];

  readonly hasPartialUpdate = true;

  @consume({ context: districtIndexContext, subscribe: true })
  _districtIndex!: number;

  @consume({ context: sidejobNameContext, subscribe: true })
  private _sidejobName!: SidejobName;

  private _controller: CityDistrictSidejobsListItemUnlockProgressController;

  private _progressBarRef = createRef<SlProgressBar>();
  private _hintRef = createRef<HTMLParagraphElement>();
  private _timerRef = createRef<HTMLSpanElement>();
  private _unlockedMessageRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this._controller = new CityDistrictSidejobsListItemUnlockProgressController(this);
  }

  render() {
    if (this._districtIndex === undefined || this._sidejobName === undefined) {
      return nothing;
    }

    return html`
      <sl-progress-bar ${ref(this._progressBarRef)}>
        <span class="progress-bar-content" ${ref(this._unlockedMessageRef)}> ${msg('Unlocked')} </span>
      </sl-progress-bar>
      <p ${ref(this._hintRef)} class="progress-bar-hint">
        ${msg(html`Sidejob will be unlocked in ${html`<span ${ref(this._timerRef)}></span>`}`)}
      </p>
    `;
  }

  handlePartialUpdate = () => {
    if (this._districtIndex === undefined || this._sidejobName === undefined) {
      return;
    }

    const requiredConnectivity = this._controller.getRequiredConnectivity(this._sidejobName);
    const currentConnectivity = this._controller.getCurrentConnectivity(this._districtIndex);

    if (this._progressBarRef.value) {
      const progressBarValue = calculateLevelProgressPercentage(0, currentConnectivity, requiredConnectivity);

      this._progressBarRef.value.value = progressBarValue;
    }

    const connectivityGrowth = this._controller.getConnectivityGrowth(this._districtIndex);
    const canReachNextTier = connectivityGrowth > 0 && currentConnectivity < requiredConnectivity;

    if (this._hintRef.value) {
      if (canReachNextTier) {
        this._hintRef.value.classList.add('visible');
      } else {
        this._hintRef.value.classList.remove('visible');
      }
    }

    if (this._timerRef.value && canReachNextTier) {
      const formattedTime = this._controller.formatter.formatTimeLong(
        (requiredConnectivity - currentConnectivity) / connectivityGrowth,
      );

      this._timerRef.value.textContent = formattedTime;
    }

    if (this._unlockedMessageRef.value) {
      if (currentConnectivity >= requiredConnectivity) {
        this._unlockedMessageRef.value.classList.add('visible');
      } else {
        this._unlockedMessageRef.value.classList.remove('visible');
      }
    }
  };
}
