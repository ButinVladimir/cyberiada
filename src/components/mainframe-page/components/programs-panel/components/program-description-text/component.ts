import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramName } from '@state/progam-factory/types';
import {
  CodeGeneratorDescriptionEffectRenderer,
  MainframeHardwareAutobuyerDescriptionEffectRenderer,
  PredictiveComputatorDescriptionEffectRenderer,
  ShareServerDescriptionEffectRenderer,
  MainframeProgramsAutobuyerDescriptionEffectRenderer,
} from './description-effect-renderers';
import { IDescriptionParameters } from './interfaces';
import { ProgramDescriptionTextController } from './controller';

@customElement('ca-program-description-text')
export class ProgramDescriptionText extends BaseComponent<ProgramDescriptionTextController> {
  static styles = css`
    :host {
      white-space: normal;
    }

    p {
      margin: 0;
    }

    p.line-break {
      height: var(--sl-spacing-medium);
    }
  `;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName!: string;

  protected controller: ProgramDescriptionTextController;

  constructor() {
    super();

    this.controller = new ProgramDescriptionTextController(this);
  }

  renderContent() {
    const program = this.controller.getProgram(this.programName as ProgramName);

    if (!program) {
      return html``;
    }

    const requirements = program.isAutoscalable
      ? this.renderAutoscalableRequirements()
      : this.renderNormalRequirements();

    const effects = this.renderEffects();

    return html`
      <p>
        <intl-message label="programs:${this.programName}:overview"> Program overview </intl-message>
      </p>

      <p class="line-break"></p>

      ${requirements}

      <p class="line-break"></p>

      <p>
        <intl-message label="ui:mainframe:programDescription:effects"> Effects </intl-message>
      </p>

      ${effects}
    `;
  }

  private renderAutoscalableRequirements = () => {
    return html`
      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:requirementsScalable">
          Requirements
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:ramAllUnused"> RAM: All unused </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:coresAllUnused">
          Cores: All unused
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:completionTimeScalable">
          Completion time: Instant
        </intl-message>
      </p>
    `;
  };

  private renderNormalRequirements = () => {
    const program = this.controller.getProgram(this.programName as ProgramName)!;
    const formatter = this.controller.formatter;

    const ramValue = JSON.stringify({
      ram: formatter.formatNumberDecimal(program.ram),
    });

    const coresValue = JSON.stringify({
      cores: formatter.formatNumberDecimal(program.cores),
    });

    const completionTimeValues = JSON.stringify({
      minTime: formatter.formatTimeShort(program.calculateCompletionMinTime(1)),
      maxTime: formatter.formatTimeShort(program.calculateCompletionMaxTime(1)),
    });

    return html`
      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:requirementsSingle">
          Requirements
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:ram" value=${ramValue}> RAM </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:cores" value=${coresValue}>
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

  private renderEffects = () => {
    const program = this.controller.getProgram(this.programName as ProgramName)!;

    const parameters: IDescriptionParameters = {
      formatter: this.controller.formatter,
      program: program,
      cores: this.controller.cores,
      ram: this.controller.ram,
    };

    switch (this.programName) {
      case ProgramName.shareServer:
        return new ShareServerDescriptionEffectRenderer(parameters).renderEffect();

      case ProgramName.codeGenerator:
        return new CodeGeneratorDescriptionEffectRenderer(parameters).renderEffect();

      case ProgramName.predictiveComputator:
        return new PredictiveComputatorDescriptionEffectRenderer(parameters).renderEffect();

      case ProgramName.mainframeHardwareAutobuyer:
        return new MainframeHardwareAutobuyerDescriptionEffectRenderer(parameters).renderEffect();

      case ProgramName.mainframeProgramsAutobuyer:
        return new MainframeProgramsAutobuyerDescriptionEffectRenderer(parameters).renderEffect();

      default:
        return html``;
    }
  };
}
