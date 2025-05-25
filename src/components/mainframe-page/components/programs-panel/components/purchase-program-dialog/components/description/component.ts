import { css, html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { customElement, queryAll } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { consume } from '@lit/context';
import { type IProgram, OtherProgramName, MultiplierProgramName, AutobuyerProgramName } from '@state/mainframe-state';
import {
  BaseComponent,
  getHighlightValueClass,
  diffFormatterParameters,
  highlightedValuesStyle,
  getHighlightDifferenceClassMap,
} from '@shared/index';
import { COMMON_TEXTS, PROGRAM_DESCRIPTION_TEXTS, PROGRAM_TEXTS } from '@texts/index';
import {
  CodeGeneratorDescriptionEffectRenderer,
  CircuitDesignerDescriptionEffectRenderer,
  DealMakerDescriptionEffectRenderer,
  InformationCollectorDescriptionEffectRenderer,
  MainframeHardwareAutobuyerDescriptionEffectRenderer,
  PredictiveComputatorDescriptionEffectRenderer,
  ShareServerDescriptionEffectRenderer,
  MainframeProgramsAutobuyerDescriptionEffectRenderer,
  CloneLevelAutoupgraderDescriptionEffectRenderer,
  PeerReviewerDescriptionEffectRenderer,
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

  @queryAll('span[data-value]')
  private _valueEls!: NodeListOf<HTMLSpanElement>;

  @queryAll('span[data-diff]')
  private _diffEls!: NodeListOf<HTMLSpanElement>;

  private _costElRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this._controller = new ProgramDiffTextController(this);
  }

  render() {
    this.updateRenderer();

    if (!this._program) {
      return;
    }

    const requirements = this._program.isAutoscalable
      ? this.renderAutoscalableRequirements()
      : this.renderNormalRequirements();

    const effects = this.renderEffects();

    return html`
      <p>${PROGRAM_TEXTS[this._program.name].overview()}</p>

      <p class="line-break"></p>

      <p class="text">
        ${COMMON_TEXTS.parameterValue(COMMON_TEXTS.cost(), html`<span ${ref(this._costElRef)}></span>`)}
      </p>

      <p class="line-break"></p>

      ${requirements}

      <p class="line-break"></p>

      <p>${PROGRAM_DESCRIPTION_TEXTS.effects()}</p>

      ${effects}
    `;
  }

  private renderAutoscalableRequirements = () => {
    return html`
      <p>${PROGRAM_DESCRIPTION_TEXTS.requirementsAutoscalable()}</p>

      <p>
        ${COMMON_TEXTS.parameterValue(
          PROGRAM_DESCRIPTION_TEXTS.ram(),
          PROGRAM_DESCRIPTION_TEXTS.allAvailable(this._program!.ram),
        )}
      </p>

      <p>
        ${COMMON_TEXTS.parameterValue(PROGRAM_DESCRIPTION_TEXTS.cores(), PROGRAM_DESCRIPTION_TEXTS.allAvailable(1))}
      </p>

      <p>
        ${COMMON_TEXTS.parameterValue(PROGRAM_DESCRIPTION_TEXTS.completionTime(), PROGRAM_DESCRIPTION_TEXTS.instant())}
      </p>
    `;
  };

  private renderNormalRequirements = () => {
    const formatter = this._controller.formatter;

    const coresDiff = this._ownedProgram ? this._program!.cores - this._ownedProgram.cores : this._program!.cores;

    const minTime = this._program!.calculateCompletionMinTime(1);
    const minTimeDiff = this._ownedProgram ? minTime - this._ownedProgram.calculateCompletionMinTime(1) : minTime;
    const maxTime = this._program!.calculateCompletionMaxTime(1);
    const maxTimeDiff = this._ownedProgram ? maxTime - this._ownedProgram.calculateCompletionMaxTime(1) : maxTime;

    const formattedRam = formatter.formatNumberDecimal(this._program!.ram);
    const formattedCores = formatter.formatNumberDecimal(this._program!.cores);

    const coresDiffClass = getHighlightDifferenceClassMap(coresDiff);
    const coresDiffEl = html`<span class=${coresDiffClass}
      >${formatter.formatNumberDecimal(coresDiff, diffFormatterParameters)}</span
    >`;

    const formattedMinTime = formatter.formatTimeShort(minTime);
    const formattedMaxTime = formatter.formatTimeShort(maxTime);

    const minTimeDiffClass = getHighlightDifferenceClassMap(-minTimeDiff);
    const minTimeDiffEl = html`<span class=${minTimeDiffClass}
      >${formatter.formatTimeShort(minTimeDiff, diffFormatterParameters)}</span
    >`;

    const maxTimeDiffClass = getHighlightDifferenceClassMap(-maxTimeDiff);
    const maxTimeDiffEl = html`<span class=${maxTimeDiffClass}
      >${formatter.formatTimeShort(maxTimeDiff, diffFormatterParameters)}</span
    >`;

    return html`
      <p>${PROGRAM_DESCRIPTION_TEXTS.requirementsSingle()}</p>

      <p>${COMMON_TEXTS.parameterValue(PROGRAM_DESCRIPTION_TEXTS.ram(), formattedRam)}</p>

      <p>
        ${COMMON_TEXTS.parameterValue(
          PROGRAM_DESCRIPTION_TEXTS.cores(),
          PROGRAM_DESCRIPTION_TEXTS.upToDiff(formattedCores, coresDiffEl),
        )}
      </p>

      <p>
        ${COMMON_TEXTS.parameterValue(
          PROGRAM_DESCRIPTION_TEXTS.completionTime(),
          PROGRAM_DESCRIPTION_TEXTS.minMaxIntervalDiff(
            formattedMinTime,
            formattedMaxTime,
            minTimeDiffEl,
            maxTimeDiffEl,
          ),
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

    this._renderer.recalculateValues();

    this._valueEls.forEach((valueEl) => {
      valueEl.textContent = this._renderer!.values[valueEl.dataset.value!];
    });

    this._diffEls.forEach((diffEl) => {
      const { value, className } = this._renderer!.diffs[diffEl.dataset.diff!];

      diffEl.textContent = value;
      diffEl.className = className;
    });
  };

  private renderCost() {
    if (!this._costElRef.value) {
      return;
    }

    const cost = this._controller.getProgramCost(this._program!.name, this._program!.tier, this._program!.level);
    const money = this._controller.money;

    const formattedCost = this._controller.formatter.formatNumberFloat(cost);
    const className = getHighlightValueClass(money >= cost);

    this._costElRef.value.textContent = formattedCost;
    this._costElRef.value.className = className;
  }

  private updateRenderer(): void {
    if (!this._program) {
      this._renderer = undefined;
      return;
    }

    const parameters: IDescriptionParameters = {
      formatter: this._controller.formatter,
      program: this._program!,
      ownedProgram: this._ownedProgram,
      cores: this._controller.cores,
      ram: this._controller.ram,
    };

    switch (this._program!.name) {
      case MultiplierProgramName.codeGenerator:
        this._renderer = new CodeGeneratorDescriptionEffectRenderer(parameters);
        break;

      case MultiplierProgramName.circuitDesigner:
        this._renderer = new CircuitDesignerDescriptionEffectRenderer(parameters);
        break;

      case MultiplierProgramName.dealMaker:
        this._renderer = new DealMakerDescriptionEffectRenderer(parameters);
        break;

      case MultiplierProgramName.informationCollector:
        this._renderer = new InformationCollectorDescriptionEffectRenderer(parameters);
        break;

      case AutobuyerProgramName.mainframeHardwareAutobuyer:
        this._renderer = new MainframeHardwareAutobuyerDescriptionEffectRenderer(parameters);
        break;

      case AutobuyerProgramName.mainframeProgramsAutobuyer:
        this._renderer = new MainframeProgramsAutobuyerDescriptionEffectRenderer(parameters);
        break;

      case AutobuyerProgramName.cloneLevelAutoupgrader:
        this._renderer = new CloneLevelAutoupgraderDescriptionEffectRenderer(parameters);
        break;

      case OtherProgramName.shareServer:
        this._renderer = new ShareServerDescriptionEffectRenderer(parameters);
        break;

      case OtherProgramName.predictiveComputator:
        this._renderer = new PredictiveComputatorDescriptionEffectRenderer(parameters);
        break;

      case OtherProgramName.peerReviewer:
        this._renderer = new PeerReviewerDescriptionEffectRenderer(parameters);
        break;

      default:
        this._renderer = undefined;
    }
  }
}
