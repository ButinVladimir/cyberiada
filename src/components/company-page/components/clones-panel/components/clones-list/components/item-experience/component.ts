import { css, html, nothing, PropertyValues } from 'lit';
import { localized, msg } from '@lit/localize';
import { consume } from '@lit/context';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { type IClone } from '@state/company-state';
import { COMMON_TEXTS } from '@texts/common';
import { calculateLevelProgressPercentage } from '@shared/helpers';
import { cloneContext } from '../item/contexts';
import { BaseController } from '@/shared';

@localized()
@customElement('ca-clones-list-item-experience')
export class ClonesListItemExperience extends BaseComponent<BaseController> {
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

  protected controller: BaseController;

  @consume({ context: cloneContext, subscribe: true })
  private _clone?: IClone;

  private _progressBarRef = createRef<SlProgressBar>();
  private _hintRef = createRef<HTMLParagraphElement>();

  constructor() {
    super();

    this.controller = new BaseController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    if (!this._clone) {
      return nothing;
    }

    return html`
      <div class="title">${msg('Next level progress')}</div>
      <sl-progress-bar ${ref(this._progressBarRef)}></sl-progress-bar>
      <p ${ref(this._hintRef)} class="hint"></p>
    `;
  }

  private handlePartialUpdate = () => {
    if (!this._clone) {
      return;
    }

    const formatter = this.controller.formatter;

    if (this._progressBarRef.value) {
      const progressBarValue = calculateLevelProgressPercentage(
        this._clone.getLevelRequirements(this._clone.level - 1),
        this._clone.experience,
        this._clone.getLevelRequirements(this._clone.level),
      );
      const progressBarPercentage = COMMON_TEXTS.percentage(formatter.formatNumberFloat(progressBarValue));

      this._progressBarRef.value.value = progressBarValue;
      this._progressBarRef.value.textContent = progressBarPercentage;
    }
  };
}
