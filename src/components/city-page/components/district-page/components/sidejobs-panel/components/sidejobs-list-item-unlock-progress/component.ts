import { css, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { calculateLevelProgressPercentage } from '@shared/helpers';
import { COMMON_TEXTS } from '@texts/common';
import { CityDistrictSidejobsListItemUnlockProgressController } from './controller';
import { localized } from '@lit/localize';
import { type SidejobName } from '@/state/company-state';

@localized()
@customElement('ca-city-district-sidejobs-list-item-unlock-progress')
export class CityDistrictSidejobsListItemUnlockProgress extends BaseComponent<CityDistrictSidejobsListItemUnlockProgressController> {
  static styles = [
    hintStyle,
    css`
      :host {
        flex: 1 1 auto;
      }

      p.hint {
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
      }
    `,
  ];

  @property({
    attribute: 'district-index',
    type: Number,
  })
  districtIndex!: number;

  @property({
    attribute: 'sidejob-name',
    type: String,
  })
  sidejobName!: SidejobName;

  protected controller: CityDistrictSidejobsListItemUnlockProgressController;

  private _progressBarRef = createRef<SlProgressBar>();
  private _hintRef = createRef<HTMLParagraphElement>();

  constructor() {
    super();

    this.controller = new CityDistrictSidejobsListItemUnlockProgressController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <sl-progress-bar ${ref(this._progressBarRef)}></sl-progress-bar>
    `;
  }

  private handlePartialUpdate = () => {
    const formatter = this.controller.formatter;
    const requiredConnectivity = this.controller.getRequiredConnectivity(this.sidejobName);
    const currentConnectivity = this.controller.getCurrentConnectivity(this.districtIndex);

    if (this._progressBarRef.value) {
      const progressBarValue = calculateLevelProgressPercentage(
        0,
        currentConnectivity,
        requiredConnectivity,
      );
      const progressBarPercentage = COMMON_TEXTS.percentage(formatter.formatNumberFloat(progressBarValue));

      this._progressBarRef.value.value = progressBarValue;
      this._progressBarRef.value.textContent = progressBarPercentage;
    }
  };
}
