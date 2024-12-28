import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramName } from '@state/progam-factory/types';
import { diffFormatterParametersDecimal, diffFormatterParametersShortTime } from '@shared/formatter-parameters';
import {
  CodeGeneratorDescriptionEffectRenderer,
  MainframeHardwareAutobuyerDescriptionEffectRenderer,
  PredictiveComputatorDescriptionEffectRenderer,
  ShareServerDescriptionEffectRenderer,
  MainframeProgramsAutobuyerDescriptionEffectRenderer,
} from './description-effect-renderers';
import { IDescriptionParameters } from './interfaces';
import { ProgramDiffTextController } from './controller';

@customElement('ca-program-diff-text')
export class ProgramDiffText extends BaseComponent<ProgramDiffTextController> {
  static styles = css`
    :host {
      margin-top: var(--sl-spacing-medium);
      margin-bottom: 0;
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

  @property({
    attribute: 'level',
    type: Number,
  })
  level = 0;

  @property({
    attribute: 'quality',
    type: Number,
  })
  quality = 0;

  protected controller: ProgramDiffTextController;

  constructor() {
    super();

    this.controller = new ProgramDiffTextController(this);
  }

  renderContent() {
    const program = this.controller.getSelectedProgram(this.programName as ProgramName, this.level, this.quality);

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
    const program = this.controller.getSelectedProgram(this.programName as ProgramName, this.level, this.quality);
    const ownedProgram = this.controller.getOwnedProgram(this.programName as ProgramName);
    const formatter = this.controller.formatter;

    const ramValues = JSON.stringify({ ram: formatter.formatNumberDecimal(program.ram) });

    const coresDiff = ownedProgram ? program.cores - ownedProgram.cores : program.cores;
    const coresValues = JSON.stringify({
      cores: formatter.formatNumberDecimal(program.cores),
      coresDiff: formatter.formatNumberDecimal(coresDiff, diffFormatterParametersDecimal),
    });

    const minTime = program.calculateCompletionMinTime(1);
    const minTimeDiff = ownedProgram ? minTime - ownedProgram.calculateCompletionMinTime(1) : minTime;
    const maxTime = program.calculateCompletionMaxTime(1);
    const maxTimeDiff = ownedProgram ? maxTime - ownedProgram.calculateCompletionMaxTime(1) : maxTime;
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

  private renderEffects = () => {
    const program = this.controller.getSelectedProgram(this.programName as ProgramName, this.level, this.quality);
    const ownedProgram = this.controller.getOwnedProgram(this.programName as ProgramName);

    const parameters: IDescriptionParameters = {
      formatter: this.controller.formatter,
      program,
      ownedProgram,
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
