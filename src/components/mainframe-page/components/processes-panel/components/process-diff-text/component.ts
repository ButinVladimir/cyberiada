import { css, html, nothing } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import {
  type ProgramName,
  OtherProgramName,
  MultiplierProgramName,
} from '@state/mainframe-state/states/progam-factory/types';
import { diffFormatterParameters } from '@shared/formatter-parameters';
import { PROGRAM_DESCRIPTION_TEXTS, PROGRAM_TEXTS } from '@texts/programs';
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
import { IDescriptionEffectRenderer, IDescriptionParameters } from './interfaces';
import { ProcessDiffTextController } from './controller';

@localized()
@customElement('ca-process-diff-text')
export class ProgramDiffText extends BaseComponent {
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

  hasPartialUpdate = true;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName!: ProgramName;

  @property({
    attribute: 'threads',
    type: Number,
  })
  threads = 0;

  private _controller: ProcessDiffTextController;

  private _renderer?: IDescriptionEffectRenderer;

  @queryAll('p[data-name]')
  private _paragraphs!: NodeListOf<HTMLParagraphElement>;

  constructor() {
    super();

    this._controller = new ProcessDiffTextController(this);
  }

  render() {
    const program = this._controller.getProgram(this.programName as ProgramName);

    if (!program) {
      return nothing;
    }

    const requirements = program.isAutoscalable
      ? this.renderAutoscalableRequirements()
      : this.renderNormalRequirements();

    this.updateRenderer();
    const effects = this.renderEffects();

    return html`
      <p>${PROGRAM_TEXTS[this.programName].overview()}</p>

      <p class="line-break"></p>

      ${requirements}

      <p class="line-break"></p>

      <p>${msg('Effects')}</p>

      ${effects}
    `;
  }

  private renderAutoscalableRequirements = () => {
    return html`
      <p>${PROGRAM_DESCRIPTION_TEXTS.requirementsAutoscalable()}</p>

      <p>${PROGRAM_DESCRIPTION_TEXTS.ramAllUnused()}</p>

      <p>${PROGRAM_DESCRIPTION_TEXTS.coresAllUnused()}</p>

      <p>${PROGRAM_DESCRIPTION_TEXTS.completionTimeAutoscalable()}</p>
    `;
  };

  private renderNormalRequirements = () => {
    const program = this._controller.getProgram(this.programName as ProgramName)!;
    const currentProcess = this._controller.getProcessByName(this.programName as ProgramName);
    const currentThreads = currentProcess ? currentProcess.threads : 0;
    const formatter = this._controller.formatter;

    const threadsDiff = this.threads - currentThreads;

    const programRam = program.ram * this.threads;

    const formattedThreads = formatter.formatNumberDecimal(this.threads);
    const formattedThreadsDiff = formatter.formatNumberDecimal(threadsDiff, diffFormatterParameters);

    const ramDiff = programRam - program.ram * currentThreads;
    const availableRam = this._controller.availableRam + program.ram * currentThreads;

    const formattedRam = formatter.formatNumberDecimal(programRam);
    const formattedAvailableRam = formatter.formatNumberDecimal(availableRam);
    const formattedRamDiff = formatter.formatNumberDecimal(ramDiff, diffFormatterParameters);

    const cores = program.cores * this.threads;
    const coresDiff = cores - program.cores * currentThreads;

    const formattedCores = formatter.formatNumberDecimal(cores);
    const formattedCoresDiff = formatter.formatNumberDecimal(coresDiff, diffFormatterParameters);

    const minTime = program.calculateCompletionMinTime(this.threads);
    const maxTime = program.calculateCompletionMaxTime(this.threads);

    let minTimeDiff = 0;
    let maxTimeDiff = 0;

    if (currentThreads > 0) {
      minTimeDiff = minTime - program.calculateCompletionMinTime(currentThreads);
      maxTimeDiff = maxTime - program.calculateCompletionMaxTime(currentThreads);
    }

    const formattedMinTime = formatter.formatTimeShort(minTime);
    const formattedMaxTime = formatter.formatTimeShort(maxTime);
    const formattedMinTimeDiff = formatter.formatTimeShort(minTimeDiff, diffFormatterParameters);
    const formattedMaxTimeDiff = formatter.formatTimeShort(maxTimeDiff, diffFormatterParameters);

    return html`
      <p>${PROGRAM_DESCRIPTION_TEXTS.requirementsDiff(formattedThreads, formattedThreadsDiff)}</p>

      <p>${PROGRAM_DESCRIPTION_TEXTS.ramDiff(formattedRam, formattedAvailableRam, formattedRamDiff)}</p>

      <p>${PROGRAM_DESCRIPTION_TEXTS.coresDiff(formattedCores, formattedCoresDiff)}</p>

      <p>
        ${PROGRAM_DESCRIPTION_TEXTS.completionTimeDiff(
          formattedMinTime,
          formattedMaxTime,
          formattedMinTimeDiff,
          formattedMaxTimeDiff,
        )}
      </p>
    `;
  };

  private renderEffects = () => {
    if (!this._renderer) {
      return nothing;
    }

    return this._renderer.renderEffect();
  };

  handlePartialUpdate = () => {
    if (!this._renderer) {
      return;
    }

    return this._renderer.partialUpdate(this._paragraphs);
  };

  private updateRenderer(): void {
    const program = this._controller.getProgram(this.programName as ProgramName)!;
    const currentProcess = this._controller.getProcessByName(this.programName as ProgramName);
    const currentThreads = currentProcess ? currentProcess.threads : 0;

    const parameters: IDescriptionParameters = {
      formatter: this._controller.formatter,
      program,
      maxCores: this._controller.maxCores,
      maxRam: this._controller.maxRam,
      threads: this.threads,
      currentThreads,
    };

    switch (this.programName) {
      case OtherProgramName.shareServer:
        this._renderer = new ShareServerDescriptionEffectRenderer(parameters);
        break;

      case MultiplierProgramName.codeGenerator:
        this._renderer = new CodeGeneratorDescriptionEffectRenderer(parameters);
        break;

      case MultiplierProgramName.circuitDesigner:
        this._renderer = new CircuitDesignerDescriptionEffectRenderer(parameters);
        break;

      case MultiplierProgramName.informationCollector:
        this._renderer = new InformationCollectorDescriptionEffectRenderer(parameters);
        break;

      case MultiplierProgramName.dealMaker:
        this._renderer = new DealMakerDescriptionEffectRenderer(parameters);
        break;

      case OtherProgramName.predictiveComputator:
        this._renderer = new PredictiveComputatorDescriptionEffectRenderer(parameters);
        break;

      case OtherProgramName.mainframeHardwareAutobuyer:
        this._renderer = new MainframeHardwareAutobuyerDescriptionEffectRenderer(parameters);
        break;

      case OtherProgramName.mainframeProgramsAutobuyer:
        this._renderer = new MainframeProgramsAutobuyerDescriptionEffectRenderer(parameters);
        break;

      default:
        this._renderer = undefined;
    }
  }
}
