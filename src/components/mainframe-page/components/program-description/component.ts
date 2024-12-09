import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramName } from '@state/progam-factory/types';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramDescriptionController } from './controller';

@customElement('ca-program-description')
export class ProgramDescription extends BaseComponent<ProgramDescriptionController> {
  static styles = css`
    :host {
      white-space: pre-line;
    }
  `;

  protected controller: ProgramDescriptionController;

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

    this.controller = new ProgramDescriptionController(this);
  }

  renderContent() {
    const program = this.programName
      ? this.controller.getProgram(this.programName as ProgramName, this.level, this.quality)
      : undefined;

    if (!program) {
      return html``;
    }

    const costValues = JSON.stringify(program.buildCostParametersObject());

    const description = program.isAutoscalable
      ? this.renderScalableDescription(program)
      : this.renderOrdinaryDescription(program);

    return html`<intl-message label="programs:${this.programName}:overview"> Program overview </intl-message>

      <intl-message label="ui:mainframe:programDescription:cost" value=${costValues}> Cost </intl-message>
      ${description}`;
  }

  private renderScalableDescription = (program: IProgram) => {
    const cores = this.controller.cores;
    const ram = this.controller.ram;

    const descriptionValues = JSON.stringify(program.buildProgramDescriptionParametersObject(cores, ram));

    return html`<intl-message label="ui:mainframe:programDescription:requirementsScalable"> Requirements </intl-message>
      <intl-message label="ui:mainframe:programDescription:completionTimeScalable"> Completion time </intl-message>
      <intl-message label="programs:${this.programName}:programDescription" value=${descriptionValues}>
        Program description
      </intl-message>`;
  };

  private renderOrdinaryDescription = (program: IProgram) => {
    const formatter = this.controller.formatter;

    const requirementsValues = JSON.stringify(program.buildRequirementsParametersObject(this.threads));
    const descriptionValues = JSON.stringify(program.buildProgramDescriptionParametersObject(this.threads, 1));
    const completionTimeValues = program.buildCompletionTimeParametersObject(this.threads);
    const formattedCompletionTimeValues = JSON.stringify({
      minTime: formatter.formatTimeShort(completionTimeValues.minTime),
      maxTime: formatter.formatTimeShort(completionTimeValues.maxTime),
    });

    return html`<intl-message label="ui:mainframe:programDescription:requirements" value=${requirementsValues}>
        Requirements
      </intl-message>
      <intl-message label="ui:mainframe:programDescription:completionTime" value=${formattedCompletionTimeValues}>
        Completion time
      </intl-message>
      <intl-message label="programs:${this.programName}:programDescription" value=${descriptionValues}>
        Program description
      </intl-message>`;
  };
}
