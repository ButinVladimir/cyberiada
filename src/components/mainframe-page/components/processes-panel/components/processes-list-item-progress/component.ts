import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { ProgramName, OtherProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { ProcessesListItemProgressController } from './controller';

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

  constructor() {
    super();

    this.controller = new ProcessesListItemProgressController(this);
  }

  render() {
    const formatter = this.controller.formatter;

    const process = this.controller.getProcess(this.programName as ProgramName);

    if (!process) {
      return nothing;
    }

    if (process.program.isAutoscalable) {
      return html`${t('mainframe.processes.instantCompletion', { ns: 'ui' })}`;
    }

    const progressBarValue = (process.currentCompletionPoints / process.maxCompletionPoints) * 100;
    const progressBarPercentage = `${formatter.formatNumberFloat(progressBarValue)}%`;
    const processCompletionDelta = process.calculateCompletionDelta(1);

    if (processCompletionDelta > 0) {
      const hintTime = formatter.formatTimeShort(
        (process.maxCompletionPoints - process.currentCompletionPoints) / processCompletionDelta,
      );

      return html`
        <sl-progress-bar value=${progressBarValue}> ${progressBarPercentage} </sl-progress-bar>
        <p class="hint">${t('mainframe.processes.progressBarHint', { ns: 'ui', time: hintTime })}</p>
      `;
    }

    return html` <sl-progress-bar value=${progressBarValue}> ${progressBarPercentage} </sl-progress-bar> `;
  }
}
