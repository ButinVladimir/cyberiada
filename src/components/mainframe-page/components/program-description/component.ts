import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ProgramName } from '@state/progam-factory/types';
import { ProgramDescriptionController } from './controller';

@customElement('ca-program-description')
export class ProgramDescription extends LitElement {
  static styles = css`
    :host {
      white-space: pre-line;
    }
  `;

  private _programDescriptionController: ProgramDescriptionController;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName = '';

  @property({
    attribute: 'level',
    type: Number,
  })
  level = 1;

  @property({
    attribute: 'quality',
    type: Number,
  })
  quality = 0;

  @property({
    attribute: 'threads',
    type: Number,
  })
  threads = 0;

  constructor() {
    super();

    this._programDescriptionController = new ProgramDescriptionController(this);
  }

  render() {
    const program = this.programName
      ? this._programDescriptionController.getProgram(this.programName as ProgramName, this.level, this.quality)
      : undefined;

    if (!program) {
      return html``;
    }

    const cores = this._programDescriptionController.cores;
    const ram = this._programDescriptionController.ram;

    const costValues = JSON.stringify(program.buildCostParametersObject());
    const requirementsValues = JSON.stringify(program.buildRequirementsParametersObject(this.threads));
    const descriptionValues = JSON.stringify(
      program.isAutoscalable
        ? program.buildDescriptionParametersObject(cores, ram)
        : program.buildDescriptionParametersObject(this.threads, 1),
    );
    const requirementsKey = program.isAutoscalable ? 'programRequirementsScalable' : 'programRequirements';

    return html`<intl-message label="programs:${this.programName}:overview"> Program overview </intl-message>
      <intl-message label="ui:mainframe:programCost" value=${costValues}> Cost </intl-message>
      <intl-message label="ui:mainframe:${requirementsKey}" value=${requirementsValues}> Requirements </intl-message>
      <intl-message label="programs:${this.programName}:programDescription" value=${descriptionValues}>
        Program description
      </intl-message>`;
  }
}
