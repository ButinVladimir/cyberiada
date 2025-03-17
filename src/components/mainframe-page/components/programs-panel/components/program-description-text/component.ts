import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import {
  ProgramName,
  OtherProgramName,
  MultiplierProgramName,
} from '@state/mainframe-state/states/progam-factory/types';
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
import { IDescriptionParameters } from './interfaces';
import { ProgramDescriptionTextController } from './controller';

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
  programName!: string;

  protected controller: ProgramDescriptionTextController;

  constructor() {
    super();

    this.controller = new ProgramDescriptionTextController(this);
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
    const formatter = this.controller.formatter;

    return html`
      <p>
        ${t('mainframe.programDescription.requirements.requirementsSingle', {
          ns: 'ui',
        })}
      </p>

      <p>
        ${t('mainframe.programDescription.requirements.ram', {
          ns: 'ui',
          ram: formatter.formatNumberDecimal(program.ram),
        })}
      </p>

      <p>
        ${t('mainframe.programDescription.requirements.cores', {
          ns: 'ui',
          cores: formatter.formatNumberDecimal(program.cores),
        })}
      </p>

      <p>
        ${t('mainframe.programDescription.requirements.completionTime', {
          ns: 'ui',
          minTime: formatter.formatTimeShort(program.calculateCompletionMinTime(1)),
          maxTime: formatter.formatTimeShort(program.calculateCompletionMaxTime(1)),
        })}
      </p>
    `;
  };

  private renderEffects = () => {
    const program = this.controller.getProgram(this.programName as ProgramName)!;

    const parameters: IDescriptionParameters = {
      formatter: this.controller.formatter,
      program: program,
      cores: this.controller.cores,
      ram: this.controller.ram,
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
