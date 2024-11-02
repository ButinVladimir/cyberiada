import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ProgramName } from '@state/progam-factory/types';
import { ProcessDescriptionController } from './controller';
import { MS_IN_SECOND } from '@shared/constants';

@customElement('ca-process-description')
export class ProcessDescription extends LitElement {
  static styles = css`
    :host {
      white-space: pre-line;
    }
  `;

  private _processDescriptionController: ProcessDescriptionController;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName = '';

  constructor() {
    super();

    this._processDescriptionController = new ProcessDescriptionController(this);
  }

  render() {
    const process = this.programName
      ? this._processDescriptionController.getProcess(this.programName as ProgramName)
      : undefined;

    if (!process) {
      return html``;
    }

    const formatter = this._processDescriptionController.formatter;

    const availableCores = this._processDescriptionController.availableCores;
    const availableRam = this._processDescriptionController.availableRam;

    let descriptionValues: string;
    let requirementsKey: string;
    let completionSpeedKey: string;
    let completionSpeedValue: string;

    const requirementsValues = JSON.stringify(process.program.buildRequirementsParametersObject(process.threads));

    if (process.program.isAutoscalable) {
      descriptionValues = JSON.stringify(
        process.program.buildDescriptionParametersObject(availableCores, availableRam),
      );
      requirementsKey = 'requirementsScalable';

      completionSpeedKey = 'completionSpeedScalable';
      completionSpeedValue = '';
    } else {
      descriptionValues = JSON.stringify(process.program.buildDescriptionParametersObject(process.threads, 1));
      requirementsKey = 'requirements';

      completionSpeedKey = 'completionSpeed';
      completionSpeedValue = JSON.stringify(formatter.formatNumberLong(process.calculateCompletionDelta(MS_IN_SECOND)));
    }

    return html`<intl-message label="programs:${this.programName}:overview"> Program overview </intl-message>

      <intl-message label="ui:mainframe:programDescription:${requirementsKey}" value=${requirementsValues}>
        Requirements
      </intl-message>
      <intl-message
        label="ui:mainframe:processes:processDescription:${completionSpeedKey}"
        value=${completionSpeedValue}
      >
        Completion speed
      </intl-message>
      <intl-message label="programs:${this.programName}:processDescription" value=${descriptionValues}>
        Program description
      </intl-message>`;
  }
}
