import { html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { customElement, queryAll } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { BaseComponent } from '@shared/index';
import { OtherProgramName, MultiplierProgramName, type IProgram, AutobuyerProgramName } from '@state/mainframe-state';
import { COMMON_TEXTS, PROGRAM_DESCRIPTION_TEXTS, PROGRAM_TEXTS } from '@texts/index';
import {
  CodeGeneratorDescriptionEffectRenderer,
  MainframeHardwareAutobuyerDescriptionEffectRenderer,
  PredictiveComputatorDescriptionEffectRenderer,
  ShareServerDescriptionEffectRenderer,
  MainframeProgramsAutobuyerDescriptionEffectRenderer,
  CircuitDesignerDescriptionEffectRenderer,
  InformationCollectorDescriptionEffectRenderer,
  DealMakerDescriptionEffectRenderer,
  CloneLevelAutoupgraderDescriptionEffectRenderer,
  PeerReviewerDescriptionEffectRenderer,
} from './description-effect-renderers';
import { IDescriptionEffectRenderer, IDescriptionParameters } from './interfaces';
import { ProgramDescriptionTextController } from './controller';
import { programContext } from '../item/contexts';
import styles from './styles';

@localized()
@customElement('ca-owned-programs-list-item-description')
export class ProgramDescriptionText extends BaseComponent {
  static styles = styles;

  hasPartialUpdate = true;

  private _controller: ProgramDescriptionTextController;

  private _renderer?: IDescriptionEffectRenderer;

  @queryAll('span[data-value]')
  private _valueEls!: NodeListOf<HTMLSpanElement>;

  @consume({ context: programContext, subscribe: true })
  private _program?: IProgram;

  constructor() {
    super();

    this._controller = new ProgramDescriptionTextController(this);
  }

  protected renderDesktop() {
    this.updateRenderer();

    if (!this._program) {
      this._renderer = undefined;

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

    const formattedRam = formatter.formatNumberDecimal(this._program!.ram);
    const formattedCores = formatter.formatNumberDecimal(this._program!.cores);

    const formattedMinTime = formatter.formatTimeShort(this._program!.calculateCompletionMinTime(1));
    const formattedMaxTime = formatter.formatTimeShort(this._program!.calculateCompletionMaxTime(1));

    return html`
      <p>${PROGRAM_DESCRIPTION_TEXTS.requirementsSingle()}</p>

      <p>${COMMON_TEXTS.parameterValue(PROGRAM_DESCRIPTION_TEXTS.ram(), formattedRam)}</p>

      <p>
        ${COMMON_TEXTS.parameterValue(
          PROGRAM_DESCRIPTION_TEXTS.cores(),
          PROGRAM_DESCRIPTION_TEXTS.upToValue(formattedCores),
        )}
      </p>

      <p>
        ${COMMON_TEXTS.parameterValue(
          PROGRAM_DESCRIPTION_TEXTS.completionTime(),
          PROGRAM_DESCRIPTION_TEXTS.minMaxInterval(formattedMinTime, formattedMaxTime),
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

    this._renderer.recalculateValues();

    this._valueEls.forEach((valueEl) => {
      valueEl.textContent = this._renderer!.values[valueEl.dataset.value!];
    });
  };

  private updateRenderer(): void {
    if (!this._program) {
      this._renderer = undefined;
      return;
    }

    const parameters: IDescriptionParameters = {
      formatter: this._controller.formatter,
      program: this._program!,
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
