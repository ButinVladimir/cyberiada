import { html } from 'lit';
import { ProgramName } from '@state/progam-factory/types';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { IFormatter } from '@shared/interfaces/formatter';
import {
  CodeGeneratorDescriptionEffectRenderer,
  MainframeHardwareAutobuyerDescriptionEffectRenderer,
  PredictiveComputatorDescriptionEffectRenderer,
  ShareServerDescriptionEffectRenderer,
  MainframeProgramsAutobuyerDescriptionEffectRenderer,
} from './description-effect-renderers';
import { IDescriptionParameters, IDescriptionRenderer } from './interfaces';

export class DescriptionRenderer implements IDescriptionRenderer {
  private _program: IProgram;

  private _ownedProgram?: IProgram;

  private _formatter: IFormatter;

  private _ram: number;

  private _cores: number;

  private _threads: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program;
    this._formatter = parameters.formatter;
    this._ram = parameters.availableRam;
    this._cores = parameters.usedCores;
    this._threads = parameters.threads;
  }

  public renderDescription = () => {
    const requirements = this._program.isAutoscalable
      ? this.renderAutoscalableRequirements()
      : this.renderNormalRequirements();

    const effects = this.renderEffects();

    return html`
      <div class="program-description">
        <p>
          <intl-message label="programs:${this._program.name}:overview"> Program overview </intl-message>
        </p>

        <p class="line-break"></p>

        ${requirements}

        <p class="line-break"></p>

        <p>
          <intl-message label="ui:mainframe:programDescription:effects"> Effects </intl-message>
        </p>

        ${effects}
      </div>
    `;
  };

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
    const requirementValues = JSON.stringify({
      threads: this._formatter.formatNumberDecimal(this._threads),
    });

    const ramValues = JSON.stringify({ ram: this._formatter.formatNumberDecimal(this._program.ram * this._threads) });

    const coresValues = JSON.stringify({
      cores: this._formatter.formatNumberDecimal(this._program.cores * this._threads),
    });

    const completionDelta = this._program.calculateCompletionDelta(this._threads, this._cores, 1);
    let completionTimeKey = 'completionTimeProcessNoCores';
    let completionTimeValues = '';

    if (completionDelta > 0) {
      completionTimeKey = 'completionTimeProcess';

      const time = this._program.calculateCompletionTime(this._threads, this._cores);
      completionTimeValues = JSON.stringify({
        time: this._formatter.formatTimeShort(time),
      });
    }

    return html`
      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:requirementsProcess" value=${requirementValues}>
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
    const parameters: IDescriptionParameters = {
      formatter: this._formatter,
      program: this._program,
      usedCores: this._cores,
      availableRam: this._ram,
      threads: this._threads,
    };

    switch (this._program.name) {
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
