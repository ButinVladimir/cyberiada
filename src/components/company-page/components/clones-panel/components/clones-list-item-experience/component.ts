import { css, html, nothing, PropertyValues } from 'lit';
import { localized, msg } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { COMMON_TEXTS } from '@texts/common';
import { calculateLevelProgressPercentage } from '@shared/helpers';
import { ClonesListItemExperienceController } from './controller';

@localized()
@customElement('ca-clones-list-item-experience')
export class ClonesListItemExperience extends BaseComponent<ClonesListItemExperienceController> {
  static styles = [
    hintStyle,
    css`
      p.hint {
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
      }

      div.title {
        font-size: var(--sl-font-size-small);
        line-height: var(--sl-line-height-dense);
        margin-bottom: var(--sl-spacing-2x-small);
      }

      sl-progress-bar {
        --height: var(--sl-spacing-large);
      }

      sl-progress-bar::part(label) {
        font-size: var(--sl-font-size-small);
      }
    `,
  ];

  @property({
    attribute: 'clone-id',
    type: String,
  })
  public cloneId!: string;

  protected controller: ClonesListItemExperienceController;

  private _progressBarRef = createRef<SlProgressBar>();
  private _hintRef = createRef<HTMLParagraphElement>();

  constructor() {
    super();

    this.controller = new ClonesListItemExperienceController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    const clone = this.controller.getCloneById(this.cloneId);

    if (!clone) {
      return nothing;
    }

    return html`
      <div class="title">${msg('Next level progress')}</div>
      <sl-progress-bar ${ref(this._progressBarRef)}></sl-progress-bar>
      <p ${ref(this._hintRef)} class="hint"></p>
    `;
  }

  private handlePartialUpdate = () => {
    const clone = this.controller.getCloneById(this.cloneId);

    if (!clone) {
      return;
    }

    const formatter = this.controller.formatter;

    if (this._progressBarRef.value) {
      const progressBarValue = calculateLevelProgressPercentage(
        clone.getLevelRequirements(clone.level - 1),
        clone.experience,
        clone.getLevelRequirements(clone.level),
      );
      const progressBarPercentage = COMMON_TEXTS.percentage(formatter.formatNumberFloat(progressBarValue));

      this._progressBarRef.value.value = progressBarValue;
      this._progressBarRef.value.textContent = progressBarPercentage;
    }
  };
}
