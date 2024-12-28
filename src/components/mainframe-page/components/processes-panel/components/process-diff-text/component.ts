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
import { ProcessDiffTextController } from './controller';

@customElement('ca-process-diff-text')
export class ProgramDiffText extends BaseComponent<ProcessDiffTextController> {
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
    attribute: 'threads',
    type: Number,
  })
  threads = 0;

  protected controller: ProcessDiffTextController;

  constructor() {
    super();

    this.controller = new ProcessDiffTextController(this);
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
    const currentProcess = this.controller.getProcessByName(this.programName as ProgramName);
    const currentThreads = currentProcess ? currentProcess.threads : 0;
    const formatter = this.controller.formatter;

    const threadsDiff = this.threads - currentThreads;
    const requirementsValues = JSON.stringify({
      threads: formatter.formatNumberDecimal(this.threads),
      threadsDiff: formatter.formatNumberDecimal(threadsDiff, diffFormatterParametersDecimal),
    });

    const ram = program.ram * this.threads;
    const ramDiff = ram - program.ram * currentThreads;
    const ramValues = JSON.stringify({
      ram: formatter.formatNumberDecimal(ram),
      ramDiff: formatter.formatNumberDecimal(ramDiff, diffFormatterParametersDecimal),
    });

    const cores = program.cores * this.threads;
    const coresDiff = cores - program.cores * currentThreads;
    const coresValues = JSON.stringify({
      cores: formatter.formatNumberDecimal(cores),
      coresDiff: formatter.formatNumberDecimal(coresDiff, diffFormatterParametersDecimal),
    });

    const minTime = program.calculateCompletionMinTime(this.threads);
    const maxTime = program.calculateCompletionMaxTime(this.threads);

    let minTimeDiff = minTime;
    let maxTimeDiff = maxTime;

    if (currentThreads > 0) {
      minTimeDiff = minTime - program.calculateCompletionMinTime(currentThreads);
      maxTimeDiff = maxTime - program.calculateCompletionMaxTime(currentThreads);
    }

    const completionTimeValues = JSON.stringify({
      minTime: formatter.formatTimeShort(minTime),
      maxTime: formatter.formatTimeShort(maxTime),
      minTimeDiff: formatter.formatTimeShort(minTimeDiff, diffFormatterParametersShortTime),
      maxTimeDiff: formatter.formatTimeShort(maxTimeDiff, diffFormatterParametersShortTime),
    });

    return html`
      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:requirementsDiff" value=${requirementsValues}>
          Requirements
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:ramDiff" value=${ramValues}>
          RAM
        </intl-message>
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
    const program = this.controller.getProgram(this.programName as ProgramName)!;
    const currentProcess = this.controller.getProcessByName(this.programName as ProgramName);
    const currentThreads = currentProcess ? currentProcess.threads : 0;

    const parameters: IDescriptionParameters = {
      formatter: this.controller.formatter,
      program,
      cores: this.controller.cores,
      ram: this.controller.ram,
      threads: this.threads,
      currentThreads,
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
