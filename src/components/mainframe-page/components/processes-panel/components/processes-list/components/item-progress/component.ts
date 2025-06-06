import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { localized, msg } from '@lit/localize';
import { consume } from '@lit/context';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseController, BaseComponent, calculateLevelProgressPercentage, progressBarHintStyle } from '@shared/index';
import { type IProcess } from '@state/mainframe-state';
import { processContext } from '../item/contexts';

@localized()
@customElement('ca-processes-list-item-progress')
export class ProcessesListItemProgressColumn extends BaseComponent {
  static styles = [
    progressBarHintStyle,
    css`
      :host {
        flex: 1 1 auto;
      }
    `,
  ];

  hasPartialUpdate = true;

  private _controller: BaseController;

  private _progressBarRef = createRef<SlProgressBar>();
  private _hintRef = createRef<HTMLParagraphElement>();
  private _timerRef = createRef<HTMLSpanElement>();

  @consume({ context: processContext, subscribe: true })
  private _process?: IProcess;

  constructor() {
    super();

    this._controller = new BaseController(this);
  }

  render() {
    if (!this._process) {
      return nothing;
    }

    if (this._process.program.isAutoscalable) {
      return html`${msg('Instant completion')}`;
    }

    return html`
      <sl-progress-bar ${ref(this._progressBarRef)}></sl-progress-bar>
      <p ${ref(this._hintRef)} class="progress-bar-hint">
        ${msg(html`Process will be completed in ${html`<span ${ref(this._timerRef)}></span>`}`)}
      </p>
    `;
  }

  handlePartialUpdate = () => {
    if (!this._process || this._process.program.isAutoscalable) {
      return;
    }

    const formatter = this._controller.formatter;

    const processCompletionDelta = this._process.calculateCompletionDelta(1);

    if (this._progressBarRef.value) {
      const progressBarValue = calculateLevelProgressPercentage(
        0,
        this._process.currentCompletionPoints,
        this._process.maxCompletionPoints,
      );

      this._progressBarRef.value.value = progressBarValue;
    }

    if (this._hintRef.value) {
      if (processCompletionDelta > 0) {
        this._hintRef.value.classList.add('visible');
      } else {
        this._hintRef.value.classList.remove('visible');
      }
    }

    if (this._timerRef.value && processCompletionDelta > 0) {
      const hintTime = formatter.formatTimeShort(
        (this._process.maxCompletionPoints - this._process.currentCompletionPoints) / processCompletionDelta,
      );

      this._timerRef.value.textContent = hintTime;
    }
  };
}
