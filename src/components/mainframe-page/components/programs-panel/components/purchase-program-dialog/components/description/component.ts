import { css, html, nothing } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, queryAll } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { consume } from '@lit/context';
import { type IProgram, OtherProgramName, MultiplierProgramName } from '@state/mainframe-state';
import { BaseComponent, getHighlightValueClass, diffFormatterParameters, highlightedValuesStyle } from '@shared/index';
import { COMMON_TEXTS } from '@texts/index';
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
import { existingProgramContext, temporaryProgramContext } from '../../contexts';

@localized()
@customElement('ca-purchase-program-dialog-description')
export class PurchaseProgramDialogDescription extends BaseComponent {
  static styles = [
    highlightedValuesStyle,
    css`
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
    `,
  ];

  hasPartialUpdate = true;

  @consume({ context: temporaryProgramContext, subscribe: true })
  private _program?: IProgram;

  @consume({ context: existingProgramContext, subscribe: true })
  private _ownedProgram?: IProgram;

  private _controller: ProgramDiffTextController;

  private _renderer?: IDescriptionEffectRenderer;

  @queryAll('p[data-name]')
  private _paragraphs!: NodeListOf<HTMLParagraphElement>;

  private _costElRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this._controller = new ProgramDiffTextController(this);
  }

  render() {
    if (!this._program) {
      return;
    }

    const requirements = this._program.isAutoscalable
      ? this.renderAutoscalableRequirements()
      : this.renderNormalRequirements();

    this.updateRenderer();
    const effects = this.renderEffects();

    return html`
      <p>${PROGRAM_TEXTS[this._program.name].overview()}</p>

      <p class="line-break"></p>

      <p>${COMMON_TEXTS.cost(html`<span ${ref(this._costElRef)}></span>`)}</p>

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

    const coresDiff = this._ownedProgram ? this._ownedProgram.cores - this._ownedProgram.cores : this._program!.cores;

    const minTime = this._program!.calculateCompletionMinTime(1);
    const minTimeDiff = this._ownedProgram ? minTime - this._ownedProgram.calculateCompletionMinTime(1) : minTime;
    const maxTime = this._program!.calculateCompletionMaxTime(1);
    const maxTimeDiff = this._ownedProgram ? maxTime - this._ownedProgram.calculateCompletionMaxTime(1) : maxTime;

    const formattedRam = formatter.formatNumberDecimal(this._program!.ram);
    const formattedCores = formatter.formatNumberDecimal(this._program!.cores);
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

    this.renderCost();

    return this._renderer.partialUpdate(this._paragraphs);
  };

  private renderCost() {
    if (!this._costElRef.value) {
      return;
    }

    const cost = this._controller.getProgramCost(this._program!.name, this._program!.quality, this._program!.level);
    const money = this._controller.money;

    const formattedCost = this._controller.formatter.formatNumberFloat(cost);
    const className = getHighlightValueClass(money >= cost);

    this._costElRef.value.textContent = formattedCost;
    this._costElRef.value.className = className;
  }

  private updateRenderer(): void {
    const parameters: IDescriptionParameters = {
      formatter: this._controller.formatter,
      program: this._program!,
      ownedProgram: this._ownedProgram,
      cores: this._controller.cores,
      ram: this._controller.ram,
    };

    switch (this._program!.name) {
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
