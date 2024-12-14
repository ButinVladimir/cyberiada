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

  private _formatter: IFormatter;

  private _ram: number;

  private _cores: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program;
    this._formatter = parameters.formatter;
    this._ram = parameters.ram;
    this._cores = parameters.cores;
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
    const ramValue = JSON.stringify({
      ram: this._formatter.formatNumberDecimal(this._program.ram)
    });

    const coresValue = JSON.stringify({
      cores: this._formatter.formatNumberDecimal(this._program.cores)
    });

    const completionTimeValues = JSON.stringify({
      minTime: this._formatter.formatTimeShort(this._program.calculateCompletionMinTime(1)),
      maxTime: this._formatter.formatTimeShort(this._program.calculateCompletionMaxTime(1)),
    });

    return html`
      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:requirementsSingle">
          Requirements
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:ram" value=${ramValue}> RAM </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:cores" value=${coresValue}>
          Cores
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:completionTime" value=${completionTimeValues}>
          Completion time
        </intl-message>
      </p>
    `;
  };

  private renderEffects = () => {
    const parameters: IDescriptionParameters = {
      formatter: this._formatter,
      program: this._program,
      cores: this._cores,
      ram: this._ram,
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
