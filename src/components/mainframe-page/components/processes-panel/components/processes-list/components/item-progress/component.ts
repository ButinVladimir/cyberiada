import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { localized, msg, str } from '@lit/localize';
import { consume } from '@lit/context';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseController, BaseComponent, hintStyle, calculateLevelProgressPercentage } from '@shared/index';
import { type IProcess } from '@state/mainframe-state';
import { processContext } from '../item/contexts';

@localized()
@customElement('ca-processes-list-item-progress')
export class ProcessesListItemProgressColumn extends BaseComponent {
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

  hasPartialUpdate = true;

  private _controller: BaseController;

  private _progressBarRef = createRef<SlProgressBar>();
  private _hintRef = createRef<HTMLParagraphElement>();

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
      <p ${ref(this._hintRef)} class="hint"></p>
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
        const hintTime = formatter.formatTimeShort(
          (this._process.maxCompletionPoints - this._process.currentCompletionPoints) / processCompletionDelta,
        );

        this._hintRef.value.textContent = msg(str`Process will be completed in ${hintTime}`);
      } else {
        this._hintRef.value.textContent = '';
      }
    }
  };
}
