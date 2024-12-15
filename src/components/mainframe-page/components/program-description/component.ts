import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramName } from '@state/progam-factory/types';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramDescriptionController } from './controller';
import { ProgramDescriptionType } from './types';
import {
  diffFormatterParametersDecimal,
  diffFormatterParametersLong,
  diffFormatterParametersShortTime,
} from './constants';

@customElement('ca-program-description')
export class ProgramDescription extends BaseComponent<ProgramDescriptionController> {
  static styles = css`
    :host {
      white-space: normal;
    }

    p {
      margin: 0;
    }

    p.line-break {
      height: 1rem;
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
  threads = 1;

  @property({
    attribute: 'type',
    type: String,
  })
  type: ProgramDescriptionType = ProgramDescriptionType['program-description'];

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

    let description: unknown = '';

    switch (this.type) {
      case ProgramDescriptionType['program-description']:
        description = program.isAutoscalable
          ? this.renderAutoscalableDescription(program)
          : this.renderNormalDescription(program);
        break;

      case ProgramDescriptionType['program-comparison']:
        description = program.isAutoscalable
          ? this.renderAutoscalableProgramDiff(program)
          : this.renderNormalProgramDiff(program);
        break;
    }

    return html` <p>
        <intl-message label="programs:${this.programName}:overview"> Program overview </intl-message>
      </p>

      <p class="line-break"></p>

      ${description}`;
  }

  private renderAutoscalableDescription = (program: IProgram) => {
    const formatter = this.controller.formatter;

    const costValues = JSON.stringify({ cost: formatter.formatNumberLong(program.cost) });

    return html`
      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:requirementsScalable">
          Requirements
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:cost" value=${costValues}>
          Cost
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:usesUnusedResources">
          Uses all unused RAM and cores
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:completionTimeScalable">
          Completion time: Instant
        </intl-message>
      </p>
    `;
  };

  private renderNormalDescription = (program: IProgram) => {
    const formatter = this.controller.formatter;

    const costValues = JSON.stringify({ cost: formatter.formatNumberLong(program.cost) });

    const ramValues = JSON.stringify({ ram: formatter.formatNumberDecimal(program.ram) });

    const coresValues = JSON.stringify({ cores: formatter.formatNumberDecimal(program.cores) });

    const completionTimeValues = JSON.stringify({
      minTime: formatter.formatTimeShort(program.calculateCompletionMinTime(this.threads)),
      maxTime: formatter.formatTimeShort(program.calculateCompletionMaxTime(this.threads)),
    });

    return html`
      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:requirementsSingle">
          Requirements
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:cost" value=${costValues}>
          Cost
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:ram" value=${ramValues}> RAM </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:cores" value=${coresValues}>
          Cores
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:completionTime" value=${completionTimeValues}>
          Completion time
        </intl-message>
      </p>
    `;
  };

  private renderAutoscalableProgramDiff = (program: IProgram) => {
    const formatter = this.controller.formatter;
    const currentProgram = this.controller.getCurrentProgram(program.name);

    const costDiff = currentProgram ? program.cost - currentProgram.cost : program.cost;
    const costValues = JSON.stringify({
      cost: formatter.formatNumberLong(program.cost),
      costDiff: formatter.formatNumberLong(costDiff, diffFormatterParametersLong),
    });

    return html`
      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:requirementsScalable">
          Requirements
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:costDiff" value=${costValues}>
          Cost
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:usesUnusedResources">
          Uses all unused RAM and cores
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:completionTimeScalable">
          Completion time: Instant
        </intl-message>
      </p>
    `;
  };

  private renderNormalProgramDiff = (program: IProgram) => {
    const formatter = this.controller.formatter;
    const currentProgram = this.controller.getCurrentProgram(program.name);

    const costDiff = currentProgram ? program.cost - currentProgram.cost : program.cost;
    const costValues = JSON.stringify({
      cost: formatter.formatNumberLong(program.cost),
      costDiff: formatter.formatNumberLong(costDiff, diffFormatterParametersLong),
    });

    const ramValues = JSON.stringify({ ram: formatter.formatNumberDecimal(program.ram) });

    const coresDiff = currentProgram ? program.cores - currentProgram.cores : program.cores;
    const coresValues = JSON.stringify({
      cores: formatter.formatNumberDecimal(program.cores),
      coresDiff: formatter.formatNumberDecimal(coresDiff, diffFormatterParametersDecimal),
    });

    const minTime = program.calculateCompletionMinTime(this.threads);
    const minTimeDiff = currentProgram ? minTime - currentProgram.calculateCompletionMinTime(this.threads) : minTime;
    const maxTime = program.calculateCompletionMaxTime(this.threads);
    const maxTimeDiff = currentProgram ? maxTime - currentProgram.calculateCompletionMaxTime(this.threads) : maxTime;
    const completionTimeValues = JSON.stringify({
      minTime: formatter.formatTimeShort(minTime),
      maxTime: formatter.formatTimeShort(maxTime),
      minTimeDiff: formatter.formatTimeShort(minTimeDiff, diffFormatterParametersShortTime),
      maxTimeDiff: formatter.formatTimeShort(maxTimeDiff, diffFormatterParametersShortTime),
    });

    return html`
      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:requirementsSingle">
          Requirements
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:costDiff" value=${costValues}>
          Cost
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:ram" value=${ramValues}> RAM </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:coresDiff" value=${coresValues}>
          Cores
        </intl-message>
      </p>

      <p>
        <intl-message
          label="ui:mainframe:programDescription:requirements:completionTimeDiff"
          value=${completionTimeValues}
        >
          Completion time
        </intl-message>
      </p>
    `;
  };
}
