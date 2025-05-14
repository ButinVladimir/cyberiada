import { css, html, nothing } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, queryAll } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { BaseComponent } from '@shared/index';
import { PROGRAM_DESCRIPTION_TEXTS, PROGRAM_TEXTS } from '@texts/programs';
import { type IProcess, OtherProgramName, MultiplierProgramName } from '@/state/mainframe-state';
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
import { processContext } from '../item/contexts';

@localized()
@customElement('ca-processes-list-item-description')
export class ProcessDescriptionText extends BaseComponent {
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

  hasPartialUpdate = true;

  private _controller: ProcessDescriptionTextController;

  private _renderer?: IDescriptionEffectRenderer;

  @queryAll('p[data-name]')
  private _paragraphs!: NodeListOf<HTMLParagraphElement>;

  @consume({ context: processContext, subscribe: true })
  private _process?: IProcess;

  constructor() {
    super();

    this._controller = new ProcessDescriptionTextController(this);
  }

  render() {
    if (!this._process) {
      this._renderer = undefined;

      return nothing;
    }

    const requirements = this._process.program.isAutoscalable
      ? this.renderAutoscalableRequirements()
      : this.renderNormalRequirements();

    this.updateRenderer();
    const effects = this.renderEffects();

    return html`
      <p>${PROGRAM_TEXTS[this._process.program.name].overview()}</p>

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
    const formatter = this._controller.formatter;

    const completionDelta = this._process!.program.calculateCompletionDelta(
      this._process!.threads,
      this._process!.usedCores,
      1,
    );

    const formattedThreads = formatter.formatNumberDecimal(this._process!.threads);
    const formattedRam = formatter.formatNumberDecimal(this._process!.program.ram * this._process!.threads);
    const formattedCores = formatter.formatNumberDecimal(this._process!.program.cores * this._process!.threads);

    let completionTimeLabel: string;
    if (completionDelta > 0) {
      const formattedTime = formatter.formatTimeShort(
        this._process!.program.calculateCompletionTime(this._process!.threads, this._process!.usedCores),
      );

      completionTimeLabel = PROGRAM_DESCRIPTION_TEXTS.completionTimeProcess(formattedTime);
    } else {
      completionTimeLabel = PROGRAM_DESCRIPTION_TEXTS.completionTimeNever();
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

  handlePartialUpdate = () => {
    if (!this._renderer) {
      return;
    }

    return this._renderer.partialUpdate(this._paragraphs);
  };

  private updateRenderer(): void {
    const parameters: IDescriptionParameters = {
      formatter: this._controller.formatter,
      autoscalableProcessRam: this._controller.autoscalableProcessRam,
      process: this._process!,
    };

    switch (this._process!.program.name) {
      case OtherProgramName.shareServer:
        this._renderer = new ShareServerDescriptionEffectRenderer(parameters);
        break;

      case MultiplierProgramName.codeGenerator:
        this._renderer = new CodeGeneratorDescriptionEffectRenderer(parameters);
        break;

      case MultiplierProgramName.circuitDesigner:
        this._renderer = new CircuitDesignerDescriptionEffectRenderer(parameters);
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

      case OtherProgramName.informationCollector:
        this._renderer = new InformationCollectorDescriptionEffectRenderer(parameters);
        break;

      default:
        this._renderer = undefined;
    }
  }
}
