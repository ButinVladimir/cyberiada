import { css, html, nothing } from 'lit';
import { localized, msg } from '@lit/localize';
import { consume } from '@lit/context';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { type IClone } from '@state/company-state';
import { BaseComponent, hintStyle, calculateLevelProgressPercentage, progressBarHintStyle } from '@shared/index';
import { cloneContext } from '../item/contexts';
import { ClonesListItemExperienceController } from './controller';

@localized()
@customElement('ca-clones-list-item-experience')
export class ClonesListItemExperience extends BaseComponent {
  static styles = [
    hintStyle,
    progressBarHintStyle,
    css`
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

  hasPartialUpdate = true;

  private _controller: ClonesListItemExperienceController;

  @consume({ context: cloneContext, subscribe: true })
  private _clone?: IClone;

  private _progressBarRef = createRef<SlProgressBar>();
  private _hintRef = createRef<HTMLParagraphElement>();
  private _timerRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this._controller = new ClonesListItemExperienceController(this);
  }

  render() {
    if (!this._clone) {
      return nothing;
    }

    return html`
      <div class="title">${msg('Next level progress')}</div>
      <sl-progress-bar ${ref(this._progressBarRef)}></sl-progress-bar>
      <p ${ref(this._hintRef)} class="progress-bar-hint">
        ${msg(html`Next level will be reached in ${html`<span ${ref(this._timerRef)}></span>`}`)}
      </p>
    `;
  }

  handlePartialUpdate = () => {
    if (!this._clone) {
      return;
    }

    const nextLevelRequirements = this._clone.getLevelRequirements(this._clone.level);

    if (this._progressBarRef.value) {
      const progressBarValue = calculateLevelProgressPercentage(
        this._clone.getLevelRequirements(this._clone.level - 1),
        this._clone.experience,
        nextLevelRequirements,
      );

      this._progressBarRef.value.value = progressBarValue;
    }

    const experienceGrowth = this._controller.getCloneExperienceGrowth(this._clone.id);
    const canReachNextLevel = experienceGrowth > 0 && this._clone.experience < nextLevelRequirements;

    if (this._hintRef.value) {
      if (canReachNextLevel) {
        this._hintRef.value.classList.add('visible');
      } else {
        this._hintRef.value.classList.remove('visible');
      }
    }

    if (this._timerRef.value && canReachNextLevel) {
      const formattedTime = this._controller.formatter.formatTimeShort(
        (nextLevelRequirements - this._clone.experience) / experienceGrowth,
      );

      this._timerRef.value.textContent = formattedTime;
    }
  };
}
