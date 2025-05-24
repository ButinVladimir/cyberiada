import { css, html, nothing } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { consume } from '@lit/context';
import {
  type IProcess,
  type IProgram,
  OtherProgramName,
  MultiplierProgramName,
  AutobuyerProgramName,
} from '@state/mainframe-state';
import {
  BaseComponent,
  diffFormatterParameters,
  getHighlightDifferenceClassMap,
  getHighlightValueClassMap,
  highlightedValuesStyle,
} from '@shared/index';
import { COMMON_TEXTS, PROGRAM_DESCRIPTION_TEXTS, PROGRAM_TEXTS } from '@texts/index';
import {
  CodeGeneratorDescriptionEffectRenderer,
  CircuitDesignerDescriptionEffectRenderer,
  InformationCollectorDescriptionEffectRenderer,
  DealMakerDescriptionEffectRenderer,
  MainframeHardwareAutobuyerDescriptionEffectRenderer,
  PredictiveComputatorDescriptionEffectRenderer,
  ShareServerDescriptionEffectRenderer,
  MainframeProgramsAutobuyerDescriptionEffectRenderer,
  CloneLevelAutoupgraderDescriptionEffectRenderer,
} from './description-effect-renderers';
import { IDescriptionEffectRenderer, IDescriptionParameters } from './interfaces';
import { ProcessDiffTextController } from './controller';
import { existingProcessContext, programContext } from '../../contexts';
import { PeerReviewerDescriptionEffectRenderer } from './description-effect-renderers/peer-reviewer-description-effect-renderer';

@localized()
@customElement('ca-start-process-dialog-description')
export class StartProcessDialogDescription extends BaseComponent {
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

  @property({
    attribute: 'threads',
    type: Number,
  })
  threads = 0;

  private _controller: ProcessDiffTextController;

  private _renderer?: IDescriptionEffectRenderer;

  @queryAll('span[data-value]')
  private _valueEls!: NodeListOf<HTMLSpanElement>;

  @queryAll('span[data-diff]')
  private _diffEls!: NodeListOf<HTMLSpanElement>;

  @consume({ context: programContext, subscribe: true })
  private _program?: IProgram;

  @consume({ context: existingProcessContext, subscribe: true })
  private _existingProcess?: IProcess;

  constructor() {
    super();

    this._controller = new ProcessDiffTextController(this);
  }

  performUpdate() {
    this.updateRenderer();
    super.performUpdate();
  }

  render() {
    if (!this._program) {
      return nothing;
    }

    const requirements = this._program.isAutoscalable
      ? this.renderAutoscalableRequirements()
      : this.renderNormalRequirements();

    const effects = this.renderEffects();

    return html`
      <p>${PROGRAM_TEXTS[this._program.name].overview()}</p>

      <p class="line-break"></p>

      ${requirements}

      <p class="line-break"></p>

      <p>${msg('Effects')}</p>

      ${effects}
    `;
  }

  private renderAutoscalableRequirements = () => {
    const availableRam = this._controller.getAvailableRamForProgram(this._program!.name);
    const programRam = this._program!.ram;
    const ramClass = getHighlightValueClassMap(availableRam >= programRam);
    const ramEl = html`<span class=${ramClass}>${PROGRAM_DESCRIPTION_TEXTS.allAvailable(programRam)}</span>`;

    return html`
      <p>${PROGRAM_DESCRIPTION_TEXTS.requirementsAutoscalable()}</p>

      <p>${COMMON_TEXTS.parameterValue(PROGRAM_DESCRIPTION_TEXTS.ram(), ramEl)}</p>

      <p>
        ${COMMON_TEXTS.parameterValue(PROGRAM_DESCRIPTION_TEXTS.cores(), PROGRAM_DESCRIPTION_TEXTS.allAvailable(1))}
      </p>

      <p>
        ${COMMON_TEXTS.parameterValue(PROGRAM_DESCRIPTION_TEXTS.completionTime(), PROGRAM_DESCRIPTION_TEXTS.instant())}
      </p>
    `;
  };

  private renderNormalRequirements = () => {
    const currentThreads = this._existingProcess ? this._existingProcess.threads : 0;
    const formatter = this._controller.formatter;

    const threadsDiff = this.threads - currentThreads;

    const programRam = this._program!.ram * this.threads;

    const formattedThreads = formatter.formatNumberDecimal(this.threads);
    const threadsDiffClass = getHighlightDifferenceClassMap(threadsDiff);
    const threadsDiffEl = html`<span class=${threadsDiffClass}
      >${formatter.formatNumberDecimal(threadsDiff, diffFormatterParameters)}</span
    >`;

    const ramDiff = programRam - this._program!.ram * currentThreads;
    const availableRam = this._controller.getAvailableRamForProgram(this._program!.name);

    const formattedRam = formatter.formatNumberDecimal(programRam);
    const formattedAvailableRam = formatter.formatNumberDecimal(availableRam);
    const ramClass = getHighlightValueClassMap(availableRam >= programRam);
    const ramEl = html`<span class=${ramClass}>${formattedRam} / ${formattedAvailableRam}</span>`;

    const ramDiffClass = getHighlightDifferenceClassMap(-ramDiff);
    const ramDiffEl = html`<span class=${ramDiffClass}
      >${formatter.formatNumberDecimal(ramDiff, diffFormatterParameters)}</span
    >`;

    const cores = this._program!.cores * this.threads;
    const coresDiff = cores - this._program!.cores * currentThreads;

    const formattedCores = formatter.formatNumberDecimal(cores);

    const coresDiffClass = getHighlightDifferenceClassMap(coresDiff);
    const coresDiffEl = html`<span class=${coresDiffClass}
      >${formatter.formatNumberDecimal(coresDiff, diffFormatterParameters)}</span
    >`;

    const minTime = this._program!.calculateCompletionMinTime(this.threads);
    const maxTime = this._program!.calculateCompletionMaxTime(this.threads);

    let minTimeDiff = 0;
    let maxTimeDiff = 0;

    if (currentThreads > 0) {
      minTimeDiff = minTime - this._program!.calculateCompletionMinTime(currentThreads);
      maxTimeDiff = maxTime - this._program!.calculateCompletionMaxTime(currentThreads);
    }

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
      <p>${PROGRAM_DESCRIPTION_TEXTS.requirementsDiff(formattedThreads, threadsDiffEl)}</p>

      <p>${COMMON_TEXTS.parameterValue(PROGRAM_DESCRIPTION_TEXTS.ram(), html`${ramEl} (${ramDiffEl})`)}</p>

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
    if (!this._renderer || !this._program) {
      return;
    }

    this._renderer.recalculateValues();

    this._valueEls.forEach((valueEl) => {
      valueEl.textContent = this._renderer!.values[valueEl.dataset.value!];
    });

    this._diffEls.forEach((diffEl) => {
      const { value, className } = this._renderer!.diffs[diffEl.dataset.diff!];

      diffEl.className = className;
      diffEl.textContent = value;
    });
  };

  private updateRenderer(): void {
    if (!this._program) {
      this._renderer = undefined;
      return;
    }

    const currentThreads = this._existingProcess ? this._existingProcess.threads : 0;

    const parameters: IDescriptionParameters = {
      formatter: this._controller.formatter,
      program: this._program!,
      maxCores: this._controller.maxCores,
      maxRam: this._controller.maxRam,
      threads: this.threads,
      currentThreads,
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
