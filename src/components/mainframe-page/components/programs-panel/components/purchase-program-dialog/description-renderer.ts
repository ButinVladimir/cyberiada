import { html } from 'lit';
import { ProgramName } from '@state/progam-factory/types';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { IFormatter } from '@shared/interfaces/formatter';
import { diffFormatterParametersDecimal, diffFormatterParametersShortTime } from '@shared/formatter-parameters';
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

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program;
    this._ownedProgram = parameters.ownedProgram;
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
    const ramValues = JSON.stringify({ ram: this._formatter.formatNumberDecimal(this._program.ram) });

    const coresDiff = this._ownedProgram ? this._program.cores - this._ownedProgram.cores : this._program.cores;
    const coresValues = JSON.stringify({
      cores: this._formatter.formatNumberDecimal(this._program.cores),
      coresDiff: this._formatter.formatNumberDecimal(coresDiff, diffFormatterParametersDecimal),
    });

    const minTime = this._program.calculateCompletionMinTime(1);
    const minTimeDiff = this._ownedProgram ? minTime - this._ownedProgram.calculateCompletionMinTime(1) : minTime;
    const maxTime = this._program.calculateCompletionMaxTime(1);
    const maxTimeDiff = this._ownedProgram ? maxTime - this._ownedProgram.calculateCompletionMaxTime(1) : maxTime;
    const completionTimeValues = JSON.stringify({
      minTime: this._formatter.formatTimeShort(minTime),
      maxTime: this._formatter.formatTimeShort(maxTime),
      minTimeDiff: this._formatter.formatTimeShort(minTimeDiff, diffFormatterParametersShortTime),
      maxTimeDiff: this._formatter.formatTimeShort(maxTimeDiff, diffFormatterParametersShortTime),
    });

    return html`
      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:requirementsSingle">
          Requirements
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:ram" value=${ramValues}> RAM </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:coresDiff" value=${coresValues}>
          Cores
        </intl-message>
      </p>

      <p>
        <intl-message
          label="ui:mainframe:programDescription:requirements:completionTimeDiff"
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
      ownedProgram: this._ownedProgram,
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
