import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import {
  ProgramName,
  OtherProgramName,
  MultiplierProgramName,
} from '@state/mainframe-state/states/progam-factory/types';
import { diffFormatterParametersDecimal, diffFormatterParametersShortTime } from '@shared/formatter-parameters';
import {
  CodeGeneratorDescriptionEffectRenderer,
  CircuitDesignerDescriptionEffectRenderer,
  InformationCollectorDescriptionEffectRenderer,
  DealMakerDescriptionEffectRenderer,
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

  render() {
    const program = this.controller.getProgram(this.programName as ProgramName);

    if (!program) {
      return nothing;
    }

    const requirements = program.isAutoscalable
      ? this.renderAutoscalableRequirements()
      : this.renderNormalRequirements();

    const effects = this.renderEffects();

    return html`
      <p>${t(`${this.programName}.overview`, { ns: 'programs' })}</p>

      <p class="line-break"></p>

      ${requirements}

      <p class="line-break"></p>

      <p>${t('mainframe.programDescription.effects', { ns: 'ui' })}</p>

      ${effects}
    `;
  }

  private renderAutoscalableRequirements = () => {
    return html`
      <p>${t('mainframe.programDescription.requirements.requirementsScalable', { ns: 'ui' })}</p>

      <p>${t('mainframe.programDescription.requirements.ramAllUnused', { ns: 'ui' })}</p>

      <p>${t('mainframe.programDescription.requirements.coresAllUnused', { ns: 'ui' })}</p>

      <p>${t('mainframe.programDescription.requirements.completionTimeScalable', { ns: 'ui' })}</p>
    `;
  };

  private renderNormalRequirements = () => {
    const program = this.controller.getProgram(this.programName as ProgramName)!;
    const currentProcess = this.controller.getProcessByName(this.programName as ProgramName);
    const currentThreads = currentProcess ? currentProcess.threads : 0;
    const formatter = this.controller.formatter;

    const threadsDiff = this.threads - currentThreads;

    const ram = program.ram * this.threads;
    const ramDiff = ram - program.ram * currentThreads;

    const cores = program.cores * this.threads;
    const coresDiff = cores - program.cores * currentThreads;

    const minTime = program.calculateCompletionMinTime(this.threads);
    const maxTime = program.calculateCompletionMaxTime(this.threads);

    let minTimeDiff = minTime;
    let maxTimeDiff = maxTime;

    if (currentThreads > 0) {
      minTimeDiff = minTime - program.calculateCompletionMinTime(currentThreads);
      maxTimeDiff = maxTime - program.calculateCompletionMaxTime(currentThreads);
    }

    return html`
      <p>
        ${t('mainframe.programDescription.requirements.requirementsDiff', {
          ns: 'ui',
          threads: formatter.formatNumberDecimal(this.threads),
          threadsDiff: formatter.formatNumberDecimal(threadsDiff, diffFormatterParametersDecimal),
        })}
      </p>

      <p>
        ${t('mainframe.programDescription.requirements.ramDiff', {
          ns: 'ui',
          ram: formatter.formatNumberDecimal(ram),
          ramDiff: formatter.formatNumberDecimal(ramDiff, diffFormatterParametersDecimal),
        })}
      </p>

      <p>
        ${t('mainframe.programDescription.requirements.coresDiff', {
          ns: 'ui',
          cores: formatter.formatNumberDecimal(cores),
          coresDiff: formatter.formatNumberDecimal(coresDiff, diffFormatterParametersDecimal),
        })}
      </p>

      <p>
        ${t('mainframe.programDescription.requirements.completionTimeDiff', {
          ns: 'ui',
          minTime: formatter.formatTimeShort(minTime),
          maxTime: formatter.formatTimeShort(maxTime),
          minTimeDiff: formatter.formatTimeShort(minTimeDiff, diffFormatterParametersShortTime),
          maxTimeDiff: formatter.formatTimeShort(maxTimeDiff, diffFormatterParametersShortTime),
        })}
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
      case OtherProgramName.shareServer:
        return new ShareServerDescriptionEffectRenderer(parameters).renderEffect();

      case MultiplierProgramName.codeGenerator:
        return new CodeGeneratorDescriptionEffectRenderer(parameters).renderEffect();

      case MultiplierProgramName.circuitDesigner:
        return new CircuitDesignerDescriptionEffectRenderer(parameters).renderEffect();

      case MultiplierProgramName.informationCollector:
        return new InformationCollectorDescriptionEffectRenderer(parameters).renderEffect();

      case MultiplierProgramName.dealMaker:
        return new DealMakerDescriptionEffectRenderer(parameters).renderEffect();

      case OtherProgramName.predictiveComputator:
        return new PredictiveComputatorDescriptionEffectRenderer(parameters).renderEffect();

      case OtherProgramName.mainframeHardwareAutobuyer:
        return new MainframeHardwareAutobuyerDescriptionEffectRenderer(parameters).renderEffect();

      case OtherProgramName.mainframeProgramsAutobuyer:
        return new MainframeProgramsAutobuyerDescriptionEffectRenderer(parameters).renderEffect();

      default:
        return nothing;
    }
  };
}
