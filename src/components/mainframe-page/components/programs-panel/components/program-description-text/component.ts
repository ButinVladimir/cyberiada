import { css, html, nothing } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import {
  type ProgramName,
  OtherProgramName,
  MultiplierProgramName,
} from '@state/mainframe-state/states/progam-factory/types';
import { PROGRAM_DESCRIPTION_TEXTS, PROGRAM_TEXTS } from '@texts/programs';
import {
  CodeGeneratorDescriptionEffectRenderer,
  MainframeHardwareAutobuyerDescriptionEffectRenderer,
  PredictiveComputatorDescriptionEffectRenderer,
  ShareServerDescriptionEffectRenderer,
  MainframeProgramsAutobuyerDescriptionEffectRenderer,
  CircuitDesignerDescriptionEffectRenderer,
  InformationCollectorDescriptionEffectRenderer,
  DealMakerDescriptionEffectRenderer,
} from './description-effect-renderers';
import { IDescriptionEffectRenderer, IDescriptionParameters } from './interfaces';
import { ProgramDescriptionTextController } from './controller';

@localized()
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
  programName!: ProgramName;

  protected controller: ProgramDescriptionTextController;

  private _renderer?: IDescriptionEffectRenderer;

  @queryAll('p[data-name]')
  private _paragraphs!: NodeListOf<HTMLParagraphElement>;

  constructor() {
    super();

    this.controller = new ProgramDescriptionTextController(this, this.handlePartialUpdate);
  }

  render() {
    console.log(this.programName);
    const program = this.controller.getProgram(this.programName as ProgramName);

    if (!program) {
      this._renderer = undefined;

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
    const program = this.controller.getProgram(this.programName as ProgramName)!;
    const formatter = this.controller.formatter;

    const formattedRam = formatter.formatNumberDecimal(program.ram);
    const formattedCores = formatter.formatNumberDecimal(program.cores);

    const formattedMinTime = formatter.formatTimeShort(program.calculateCompletionMinTime(1));
    const formattedMaxTime = formatter.formatTimeShort(program.calculateCompletionMaxTime(1));

    return html`
      <p>${PROGRAM_DESCRIPTION_TEXTS.requirementsSingle()}</p>

      <p>${PROGRAM_DESCRIPTION_TEXTS.ram(formattedRam)}</p>

      <p>${PROGRAM_DESCRIPTION_TEXTS.cores(formattedCores)}</p>

      <p>${PROGRAM_DESCRIPTION_TEXTS.completionTimeProgram(formattedMinTime, formattedMaxTime)}</p>
    `;
  };

  private renderEffects = () => {
    if (!this._renderer) {
      return nothing;
    }

    return this._renderer.renderEffect();
  };

  private handlePartialUpdate = () => {
    if (!this._renderer) {
      return;
    }

    return this._renderer.partialUpdate(this._paragraphs);
  };

  private updateRenderer(): void {
    const program = this.controller.getProgram(this.programName as ProgramName)!;

    const parameters: IDescriptionParameters = {
      formatter: this.controller.formatter,
      program: program,
      cores: this.controller.cores,
      ram: this.controller.ram,
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
