import { css, html } from 'lit';
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
      return html``;
    }

    const progressBarLabelValues = JSON.stringify({
      currentCompletionPoints: formatter.formatNumberLong(process.currentCompletionPoints),
      maxCompletionPoints: formatter.formatNumberLong(process.maxCompletionPoints),
    });

    const processCompletionDelta = process.calculateCompletionDelta(1);
    let progressBarHintLabel: string;
    let progressBarHintValue: string;

    if (processCompletionDelta > 0) {
      progressBarHintLabel = 'ui:mainframe:processes:progressBarHintActive';
      progressBarHintValue = formatter.formatTimeShort(
        (process.maxCompletionPoints - process.currentCompletionPoints) / processCompletionDelta,
      );
    } else {
      progressBarHintLabel = 'ui:mainframe:processes:progressBarHintPaused';
      progressBarHintValue = '';
    }

    const progresBarValue = (process.currentCompletionPoints / process.maxCompletionPoints) * 100;

    return process.program.isAutoscalable
      ? html`<div class="progress-gap"></div>`
      : html` <sl-tooltip>
          <intl-message slot="content" label=${progressBarHintLabel} value=${progressBarHintValue}>
            Progress bar hint
          </intl-message>

          <sl-progress-bar value=${progresBarValue}>
            <intl-message label="ui:mainframe:processes:progressBarLabel" value=${progressBarLabelValues}>
              Progress
            </intl-message>
          </sl-progress-bar>
        </sl-tooltip>`;
  }
}
