import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramName } from '@state/progam-factory/types';
import {
  CodeGeneratorDescriptionEffectRenderer,
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
      return html``;
    }

    const requirements = process.program.isAutoscalable
      ? this.renderAutoscalableRequirements()
      : this.renderNormalRequirements();

    const effects = this.renderEffects();

    return html`
      <p>
        <intl-message label="programs:${this.programName}:overview"> Program overview </intl-message>
      </p>

      <p class="line-break"></p>

      ${requirements}

      <p class="line-break"></p>

      <p>
        <intl-message label="ui:mainframe:programDescription:effects"> Effects </intl-message>
      </p>

      ${effects}
    `;
  }

  private renderAutoscalableRequirements = () => {
    return html`
      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:requirementsScalable">
          Requirements
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:ramAllUnused"> RAM: All unused </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:coresAllUnused">
          Cores: All unused
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:completionTimeScalable">
          Completion time: Instant
        </intl-message>
      </p>
    `;
  };

  private renderNormalRequirements = () => {
    const formatter = this.controller.formatter;
    const process = this.controller.getProcess(this.programName as ProgramName)!;

    const requirementValues = JSON.stringify({
      threads: formatter.formatNumberDecimal(process.threads),
    });

    const ramValues = JSON.stringify({ ram: formatter.formatNumberDecimal(process.program.ram * process.threads) });

    const coresValues = JSON.stringify({
      cores: formatter.formatNumberDecimal(process.program.cores * process.threads),
    });

    const completionDelta = process.program.calculateCompletionDelta(process.threads, process.usedCores, 1);
    let completionTimeKey = 'completionTimeProcessNoCores';
    let completionTimeValues = '';

    if (completionDelta > 0) {
      completionTimeKey = 'completionTimeProcess';

      const time = process.program.calculateCompletionTime(process.threads, process.usedCores);
      completionTimeValues = JSON.stringify({
        time: formatter.formatTimeShort(time),
      });
    }

    return html`
      <p>
        <intl-message
          label="ui:mainframe:programDescription:requirements:requirementsProcess"
          value=${requirementValues}
        >
          Requirements
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:ram" value=${ramValues}> RAM </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:cores" value=${coresValues}>
          Cores
        </intl-message>
      </p>

      <p>
        <intl-message
          label="ui:mainframe:programDescription:requirements:${completionTimeKey}"
          value=${completionTimeValues}
        >
          Completion time
        </intl-message>
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
      case ProgramName.shareServer:
        return new ShareServerDescriptionEffectRenderer(parameters).renderEffect();

      case ProgramName.codeGenerator:
        return new CodeGeneratorDescriptionEffectRenderer(parameters).renderEffect();

      case ProgramName.predictiveComputator:
        return new PredictiveComputatorDescriptionEffectRenderer(parameters).renderEffect();

      case ProgramName.mainframeHardwareAutobuyer:
        return new MainframeHardwareAutobuyerDescriptionEffectRenderer(parameters).renderEffect();

      case ProgramName.mainframeProgramsAutobuyer:
        return new MainframeProgramsAutobuyerDescriptionEffectRenderer(parameters).renderEffect();

      default:
        return html``;
    }
  };
}
