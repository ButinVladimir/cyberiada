import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramName } from '@state/progam-factory/types';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';
import { ProcessDescriptionController } from './controller';

@customElement('ca-process-description')
export class ProcessDescription extends BaseComponent<ProcessDescriptionController> {
  static styles = css`
    :host {
      white-space: pre-line;
    }
  `;

  protected controller: ProcessDescriptionController;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName = '';

  constructor() {
    super();

    this.controller = new ProcessDescriptionController(this);
  }

  renderContent() {
    const process = this.programName ? this.controller.getProcess(this.programName as ProgramName) : undefined;

    if (!process) {
      return html``;
    }

    const description = process.program.isAutoscalable
      ? this.renderScalableDescription(process)
      : this.renderOrdinaryDescription(process);

    return html`<intl-message label="programs:${this.programName}:overview"> Program overview </intl-message>

      ${description}`;
  }

  private renderScalableDescription = (process: IProcess) => {
    const availableRam = this.controller.availableRam;

    const descriptionValues = JSON.stringify(
      process.program.buildProcessDescriptionParametersObject(process.usedCores, process.usedCores, availableRam),
    );

    return html`<intl-message label="ui:mainframe:programDescription:requirementsScalable"> Requirements </intl-message>
      <intl-message label="ui:mainframe:processes:processDescription:completionTimeScalable">
        Completion time
      </intl-message>
      <intl-message label="programs:${this.programName}:processDescription" value=${descriptionValues}>
        Program description
      </intl-message>`;
  };

  private renderOrdinaryDescription = (process: IProcess) => {
    const formatter = this.controller.formatter;

    const requirementsValues = JSON.stringify(process.program.buildRequirementsParametersObject(process.threads));

    const completionDelta = process.calculateCompletionDelta(1);
    let completionTime: number | undefined = undefined;
    let completionTimeKey = 'completionTimeNoCores';
    let formattedCompletionTime = '';

    if (completionDelta > 0) {
      completionTime = process.calculateCompletionTime();
      completionTimeKey = 'completionTime';
      formattedCompletionTime = formatter.formatTimeShort(completionTime);
    }

    const descriptionValues = JSON.stringify(
      process.program.buildProcessDescriptionParametersObject(process.threads, process.usedCores, 1),
    );

    return html`<intl-message label="ui:mainframe:programDescription:requirements" value=${requirementsValues}>
        Requirements
      </intl-message>
      <intl-message
        label="ui:mainframe:processes:processDescription:${completionTimeKey}"
        value=${formattedCompletionTime}
      >
        Completion time
      </intl-message>
      <intl-message label="programs:${this.programName}:processDescription" value=${descriptionValues}>
        Program description
      </intl-message>`;
  };
}
