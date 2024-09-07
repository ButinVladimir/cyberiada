import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ProgramName } from '@state/progam-factory/types';
import { ProcessesListItemProgressController } from './controller';

@customElement('ca-processes-list-item-progress')
export class ProcessesListItemProgressColumn extends LitElement {
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

  private _processesListItemProgressController: ProcessesListItemProgressController;

  constructor() {
    super();

    this._processesListItemProgressController = new ProcessesListItemProgressController(this);
  }

  render() {
    const formatter = this._processesListItemProgressController.formatter;

    const process = this._processesListItemProgressController.getProcess(this.programName as ProgramName);

    if (!process) {
      return html``;
    }

    const progressBarLabelValues = JSON.stringify({
      currentCompletionPoints: formatter.formatNumberLong(process.currentCompletionPoints),
      maxCompletionPoints: formatter.formatNumberLong(process.maxCompletionPoints),
    });

    const processCompletionDelta = process.calculateCompletionDelta(1);
    const progressBarLabel =
      processCompletionDelta > 0
        ? 'ui:mainframe:processes:progressBarHintActive'
        : 'ui:mainframe:processes:progressBarHintPaused';
    const progressBarHintValue =
      processCompletionDelta > 0
        ? formatter.formatTimeShort(
            (process.maxCompletionPoints - process.currentCompletionPoints) / processCompletionDelta,
          )
        : '';

    return process.program.isAutoscalable
      ? html`<div class="progress-gap"></div>`
      : html` <sl-tooltip>
          <intl-message slot="content" label=${progressBarLabel} value=${progressBarHintValue}>
            Progress bar hint
          </intl-message>

          <sl-progress-bar value=${Math.round((process.currentCompletionPoints / process.maxCompletionPoints) * 100)}>
            <intl-message label="ui:mainframe:processes:progressBarLabel" value=${progressBarLabelValues}>
              Progress
            </intl-message>
          </sl-progress-bar>
        </sl-tooltip>`;
  }
}
