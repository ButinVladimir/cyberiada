import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { type ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { calculateLevelProgressPercentage } from '@shared/helpers';
import { ProcessesListItemProgressController } from './controller';
import { localized, msg, str } from '@lit/localize';

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

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName!: ProgramName;

  private _controller: ProcessesListItemProgressController;

  private _progressBarRef = createRef<SlProgressBar>();
  private _hintRef = createRef<HTMLParagraphElement>();

  constructor() {
    super();

    this._controller = new ProcessesListItemProgressController(this);
  }

  render() {
    const process = this._controller.getProcess(this.programName as ProgramName);

    if (!process) {
      return nothing;
    }

    if (process.program.isAutoscalable) {
      return html`${msg('Instant completion')}`;
    }

    return html`
      <sl-progress-bar ${ref(this._progressBarRef)}></sl-progress-bar>
      <p ${ref(this._hintRef)} class="hint"></p>
    `;
  }

  handlePartialUpdate = () => {
    const process = this._controller.getProcess(this.programName as ProgramName);

    if (!process || process.program.isAutoscalable) {
      return;
    }

    const formatter = this._controller.formatter;

    const processCompletionDelta = process.calculateCompletionDelta(1);

    if (this._progressBarRef.value) {
      const progressBarValue = calculateLevelProgressPercentage(
        0,
        process.currentCompletionPoints,
        process.maxCompletionPoints,
      );

      this._progressBarRef.value.value = progressBarValue;
    }

    if (this._hintRef.value) {
      if (processCompletionDelta > 0) {
        const hintTime = formatter.formatTimeShort(
          (process.maxCompletionPoints - process.currentCompletionPoints) / processCompletionDelta,
        );

        this._hintRef.value.textContent = msg(str`Process will be completed in ${hintTime}`);
      } else {
        this._hintRef.value.textContent = '';
      }
    }
  };
}
