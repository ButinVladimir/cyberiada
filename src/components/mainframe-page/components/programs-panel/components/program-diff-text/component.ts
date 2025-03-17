import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import {
  ProgramName,
  OtherProgramName,
  MultiplierProgramName,
} from '@state/mainframe-state/states/progam-factory/types';
import { diffFormatterParametersDecimal, diffFormatterParametersShortTime } from '@shared/formatter-parameters';
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
import { IDescriptionParameters } from './interfaces';
import { ProgramDiffTextController } from './controller';

@customElement('ca-program-diff-text')
export class ProgramDiffText extends BaseComponent<ProgramDiffTextController> {
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

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName!: string;

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

  protected controller: ProgramDiffTextController;

  constructor() {
    super();

    this.controller = new ProgramDiffTextController(this);
  }

  render() {
    const program = this.controller.getSelectedProgram(this.programName as ProgramName, this.level, this.quality);

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
    const program = this.controller.getSelectedProgram(this.programName as ProgramName, this.level, this.quality);
    const ownedProgram = this.controller.getOwnedProgram(this.programName as ProgramName);
    const formatter = this.controller.formatter;

    const coresDiff = ownedProgram ? program.cores - ownedProgram.cores : program.cores;

    const minTime = program.calculateCompletionMinTime(1);
    const minTimeDiff = ownedProgram ? minTime - ownedProgram.calculateCompletionMinTime(1) : minTime;
    const maxTime = program.calculateCompletionMaxTime(1);
    const maxTimeDiff = ownedProgram ? maxTime - ownedProgram.calculateCompletionMaxTime(1) : maxTime;

    return html`
      <p>${t('mainframe.programDescription.requirements.requirementsSingle', { ns: 'ui' })}</p>

      <p>
        ${t('mainframe.programDescription.requirements.ram', {
          ns: 'ui',
          ram: formatter.formatNumberDecimal(program.ram),
        })}
      </p>

      <p>
        ${t('mainframe.programDescription.requirements.coresDiff', {
          ns: 'ui',
          cores: formatter.formatNumberDecimal(program.cores),
          coresDiff: formatter.formatNumberDecimal(coresDiff, diffFormatterParametersDecimal),
        })}
      </p>

      <p>
        ${t('mainframe.programDescription.requirements.completionTimeDiff', {
          ns: 'ui',
          minTime: formatter.formatTimeShort(minTime),
          maxTime: formatter.formatTimeShort(maxTime),
          minTimeDiff: formatter.formatTimeShort(minTimeDiff, diffFormatterParametersShortTime),
          maxTimeDiff: formatter.formatTimeShort(maxTimeDiff, diffFormatterParametersShortTime),
        })}
      </p>
    `;
  };

  private renderEffects = () => {
    const program = this.controller.getSelectedProgram(this.programName as ProgramName, this.level, this.quality);
    const ownedProgram = this.controller.getOwnedProgram(this.programName as ProgramName);

    const parameters: IDescriptionParameters = {
      formatter: this.controller.formatter,
      program,
      ownedProgram,
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
