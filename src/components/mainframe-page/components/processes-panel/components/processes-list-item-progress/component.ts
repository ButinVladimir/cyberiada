import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramName } from '@state/progam-factory/types';
import { ProcessesListItemProgressController } from './controller';

@customElement('ca-processes-list-item-progress')
export class ProcessesListItemProgressColumn extends BaseComponent<ProcessesListItemProgressController> {
  static styles = css`
    :host {
      flex: 1 1 auto;
    }
  `;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName: string = ProgramName.shareServer;

  protected controller: ProcessesListItemProgressController;

  constructor() {
    super();

    this.controller = new ProcessesListItemProgressController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    const process = this.controller.getProcess(this.programName as ProgramName);

    if (!process) {
      return nothing;
    }

    const processCompletionDelta = process.calculateCompletionDelta(1);
    let progressBarHintLabel: string;
    let progressBarHintTime: string;

    if (processCompletionDelta > 0) {
      progressBarHintLabel = 'mainframe.processes.progressBarHintActive';
      progressBarHintTime = formatter.formatTimeShort(
        (process.maxCompletionPoints - process.currentCompletionPoints) / processCompletionDelta,
      );
    } else {
      progressBarHintLabel = 'mainframe.processes.progressBarHintPaused';
      progressBarHintTime = '';
    }

    const progresBarValue = (process.currentCompletionPoints / process.maxCompletionPoints) * 100;

    return process.program.isAutoscalable
      ? html`${t('mainframe.processes.instantCompletion', { ns: 'ui' })}`
      : html`<sl-tooltip>
          <span slot="content"> ${t(progressBarHintLabel, { ns: 'ui', time: progressBarHintTime })} </span>

          <sl-progress-bar value=${progresBarValue}>
            ${t('mainframe.processes.progressBarLabel', {
              ns: 'ui',
              currentCompletionPoints: formatter.formatNumberFloat(process.currentCompletionPoints),
              maxCompletionPoints: formatter.formatNumberFloat(process.maxCompletionPoints),
            })}
          </sl-progress-bar>
        </sl-tooltip>`;
  }
}
