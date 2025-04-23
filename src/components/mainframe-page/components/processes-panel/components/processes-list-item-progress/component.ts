import { css, html, nothing, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { ProgramName, OtherProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { calculateLevelProgressPercentage } from '@shared/helpers';
import { COMMON_TEXTS } from '@texts/common';
import { ProcessesListItemProgressController } from './controller';
import { localized, msg, str } from '@lit/localize';

@localized()
@customElement('ca-processes-list-item-progress')
export class ProcessesListItemProgressColumn extends BaseComponent<ProcessesListItemProgressController> {
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
    attribute: 'program-name',
    type: String,
  })
  programName: string = OtherProgramName.shareServer;

  protected controller: ProcessesListItemProgressController;

  private _progressBarRef = createRef<SlProgressBar>();
  private _hintRef = createRef<HTMLParagraphElement>();

  constructor() {
    super();

    this.controller = new ProcessesListItemProgressController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    const process = this.controller.getProcess(this.programName as ProgramName);

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

  private handlePartialUpdate = () => {
    const process = this.controller.getProcess(this.programName as ProgramName);

    if (!process || process.program.isAutoscalable) {
      return;
    }

    const formatter = this.controller.formatter;

    const processCompletionDelta = process.calculateCompletionDelta(1);

    if (this._progressBarRef.value) {
      const progressBarValue = calculateLevelProgressPercentage(
        0,
        process.currentCompletionPoints,
        process.maxCompletionPoints,
      );
      const progressBarPercentage = COMMON_TEXTS.percentage(formatter.formatNumberFloat(progressBarValue));

      this._progressBarRef.value.value = progressBarValue;
      this._progressBarRef.value.textContent = progressBarPercentage;
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
