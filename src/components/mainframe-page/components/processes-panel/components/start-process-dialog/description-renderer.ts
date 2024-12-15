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

  private _formatter: IFormatter;

  private _ram: number;

  private _cores: number;

  private _threads: number;

  private _currentThreads: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program;
    this._formatter = parameters.formatter;
    this._ram = parameters.ram;
    this._cores = parameters.cores;
    this._threads = parameters.threads;
    this._currentThreads = parameters.currentThreads;
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
    const threadsDiff = this._threads - this._currentThreads;
    const requirementsValues = JSON.stringify({ 
      threads: this._formatter.formatNumberDecimal(this._threads),
      threadsDiff: this._formatter.formatNumberDecimal(threadsDiff, diffFormatterParametersDecimal),
    })

    const ram = this._program.ram * this._threads;
    const ramDiff = ram - this._program.ram * this._currentThreads;
    const ramValues = JSON.stringify({
      ram: this._formatter.formatNumberDecimal(ram),
      ramDiff: this._formatter.formatNumberDecimal(ramDiff, diffFormatterParametersDecimal),
    });

    const cores = this._program.cores * this._threads;
    const coresDiff = cores - this._program.cores * this._currentThreads;
    const coresValues = JSON.stringify({
      cores: this._formatter.formatNumberDecimal(cores),
      coresDiff: this._formatter.formatNumberDecimal(coresDiff, diffFormatterParametersDecimal),
    });

    const minTime = this._program.calculateCompletionMinTime(this._threads);
    const maxTime = this._program.calculateCompletionMaxTime(this._threads);

    let minTimeDiff  = minTime;
    let maxTimeDiff = maxTime;
    
    if (this._currentThreads > 0) {
      minTimeDiff = minTime - this._program.calculateCompletionMinTime(this._currentThreads);
      maxTimeDiff = maxTime - this._program.calculateCompletionMaxTime(this._currentThreads);
    }

    const completionTimeValues = JSON.stringify({
      minTime: this._formatter.formatTimeShort(minTime),
      maxTime: this._formatter.formatTimeShort(maxTime),
      minTimeDiff: this._formatter.formatTimeShort(minTimeDiff, diffFormatterParametersShortTime),
      maxTimeDiff: this._formatter.formatTimeShort(maxTimeDiff, diffFormatterParametersShortTime),
    });

    return html`
      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:requirementsDiff" value=${requirementsValues}>
          Requirements
        </intl-message>
      </p>

      <p>
        <intl-message label="ui:mainframe:programDescription:requirements:ramDiff" value=${ramValues}> RAM </intl-message>
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
      cores: this._cores,
      ram: this._ram,
      threads: this._threads,
      currentThreads: this._currentThreads,
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
