import { css, html, nothing } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import {
  type ProgramName,
  OtherProgramName,
  MultiplierProgramName,
} from '@state/mainframe-state/states/progam-factory/types';
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
import { ProcessDescriptionTextController } from './controller';
import { PROGRAM_DESCRIPTION_TEXTS, PROGRAM_TEXTS } from '@texts/programs';

@localized()
@customElement('ca-process-description-text')
export class ProcessDescriptionText extends BaseComponent<ProcessDescriptionTextController> {
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

  protected controller: ProcessDescriptionTextController;

  private _renderer?: IDescriptionEffectRenderer;

  @queryAll('p[data-name]')
  private _paragraphs!: NodeListOf<HTMLParagraphElement>;

  constructor() {
    super();

    this.controller = new ProcessDescriptionTextController(this, this.handlePartialUpdate);
  }

  render() {
    const process = this.controller.getProcess(this.programName as ProgramName);

    if (!process) {
      this._renderer = undefined;

      return nothing;
    }

    const requirements = process.program.isAutoscalable
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
    const formatter = this.controller.formatter;
    const process = this.controller.getProcess(this.programName)!;

    const completionDelta = process.program.calculateCompletionDelta(process.threads, process.usedCores, 1);

    const formattedThreads = formatter.formatNumberDecimal(process.threads);
    const formattedRam = formatter.formatNumberDecimal(process.program.ram * process.threads);
    const formattedCores = formatter.formatNumberDecimal(process.program.cores * process.threads);

    let completionTimeLabel: string;
    if (completionDelta > 0) {
      const formattedTime = formatter.formatTimeShort(
        process.program.calculateCompletionTime(process.threads, process.usedCores),
      );

      completionTimeLabel = PROGRAM_DESCRIPTION_TEXTS.completionTimeProcess(formattedTime);
    } else {
      completionTimeLabel = PROGRAM_DESCRIPTION_TEXTS.completionTimeAutoscalable();
    }

    return html`
      <p>${PROGRAM_DESCRIPTION_TEXTS.requirementsProcess(formattedThreads)}</p>

      <p>${PROGRAM_DESCRIPTION_TEXTS.ram(formattedRam)}</p>

      <p>${PROGRAM_DESCRIPTION_TEXTS.cores(formattedCores)}</p>

      <p>${completionTimeLabel}</p>
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
    const process = this.controller.getProcess(this.programName as ProgramName)!;

    const parameters: IDescriptionParameters = {
      formatter: this.controller.formatter,
      autoscalableProcessRam: this.controller.autoscalableProcessRam,
      process,
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
