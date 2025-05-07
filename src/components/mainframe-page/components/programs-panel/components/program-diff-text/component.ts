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
  DealMakerDescriptionEffectRenderer,
  InformationCollectorDescriptionEffectRenderer,
  MainframeHardwareAutobuyerDescriptionEffectRenderer,
  PredictiveComputatorDescriptionEffectRenderer,
  ShareServerDescriptionEffectRenderer,
  MainframeProgramsAutobuyerDescriptionEffectRenderer,
} from './description-effect-renderers';
import { IDescriptionEffectRenderer, IDescriptionParameters } from './interfaces';
import { ProgramDiffTextController } from './controller';

@localized()
@customElement('ca-program-diff-text')
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
    attribute: 'level',
    type: Number,
  })
  level = 0;

  @property({
    attribute: 'quality',
    type: Number,
  })
  quality = 0;

  private _controller: ProgramDiffTextController;

  private _renderer?: IDescriptionEffectRenderer;

  @queryAll('p[data-name]')
  private _paragraphs!: NodeListOf<HTMLParagraphElement>;

  constructor() {
    super();

    this._controller = new ProgramDiffTextController(this);
  }

  render() {
    const program = this._controller.getSelectedProgram(this.programName as ProgramName, this.level, this.quality);

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
    const program = this._controller.getSelectedProgram(this.programName as ProgramName, this.level, this.quality);
    const ownedProgram = this._controller.getOwnedProgram(this.programName as ProgramName);
    const formatter = this._controller.formatter;

    const coresDiff = ownedProgram ? program.cores - ownedProgram.cores : program.cores;

    const minTime = program.calculateCompletionMinTime(1);
    const minTimeDiff = ownedProgram ? minTime - ownedProgram.calculateCompletionMinTime(1) : minTime;
    const maxTime = program.calculateCompletionMaxTime(1);
    const maxTimeDiff = ownedProgram ? maxTime - ownedProgram.calculateCompletionMaxTime(1) : maxTime;

    const formattedRam = formatter.formatNumberDecimal(program.ram);
    const formattedCores = formatter.formatNumberDecimal(program.cores);
    const formattedCoresDiff = formatter.formatNumberDecimal(coresDiff, diffFormatterParameters);

    const formattedMinTime = formatter.formatTimeShort(minTime);
    const formattedMinTimeDiff = formatter.formatTimeShort(minTimeDiff, diffFormatterParameters);
    const formattedMaxTime = formatter.formatTimeShort(maxTime);
    const formattedMaxTimeDiff = formatter.formatTimeShort(maxTimeDiff, diffFormatterParameters);

    return html`
      <p>${PROGRAM_DESCRIPTION_TEXTS.requirementsSingle()}</p>

      <p>${PROGRAM_DESCRIPTION_TEXTS.ram(formattedRam)}</p>

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
    const program = this._controller.getSelectedProgram(this.programName as ProgramName, this.level, this.quality);
    const ownedProgram = this._controller.getOwnedProgram(this.programName as ProgramName);

    const parameters: IDescriptionParameters = {
      formatter: this._controller.formatter,
      program,
      ownedProgram,
      cores: this._controller.cores,
      ram: this._controller.ram,
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
