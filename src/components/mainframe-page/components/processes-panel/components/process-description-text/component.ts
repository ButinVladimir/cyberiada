import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramName, OtherProgramName, MultiplierProgramName } from '@state/progam-factory/types';
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
import { IDescriptionParameters } from './interfaces';
import { ProcessDescriptionTextController } from './controller';

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
  programName!: string;

  protected controller: ProcessDescriptionTextController;

  constructor() {
    super();

    this.controller = new ProcessDescriptionTextController(this);
  }

  renderContent() {
    const process = this.controller.getProcess(this.programName as ProgramName);

    if (!process) {
      return nothing;
    }

    const requirements = process.program.isAutoscalable
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
    const formatter = this.controller.formatter;
    const process = this.controller.getProcess(this.programName as ProgramName)!;

    const completionDelta = process.program.calculateCompletionDelta(process.threads, process.usedCores, 1);

    return html`
      <p>
        ${t('mainframe.programDescription.requirements.requirementsProcess', {
          ns: 'ui',
          threads: formatter.formatNumberDecimal(process.threads),
        })}
      </p>

      <p>
        ${t('mainframe.programDescription.requirements.ram', {
          ns: 'ui',
          ram: formatter.formatNumberDecimal(process.program.ram * process.threads),
        })}
      </p>

      <p>
        ${t('mainframe.programDescription.requirements.cores', {
          ns: 'ui',
          cores: formatter.formatNumberDecimal(process.program.cores * process.threads),
        })}
      </p>

      <p>
        ${completionDelta > 0
          ? t('mainframe.programDescription.requirements.completionTimeProcess', {
              ns: 'ui',
              time: formatter.formatTimeShort(
                process.program.calculateCompletionTime(process.threads, process.usedCores),
              ),
            })
          : t('mainframe.programDescription.requirements.completionTimeProcessNoCores', { ns: 'ui' })}
      </p>
    `;
  };

  private renderEffects = () => {
    const process = this.controller.getProcess(this.programName as ProgramName)!;

    const parameters: IDescriptionParameters = {
      formatter: this.controller.formatter,
      availableRam: this.controller.availableRam,
      process,
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
