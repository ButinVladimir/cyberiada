import 'reflect-metadata';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { type IAppState, ISerializedState } from '@state/app-state';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { type IGrowthState } from '@state/growth-state';
import { type ISettingsState } from '@state/settings-state';
import { type IMainframeState } from '@state/mainframe-state';
import { type IFormatter } from '@shared/index';
import { ISimulationRequest, ISimulationTool, ISnapshot } from './interfaces';
import { SimulationAutomationType } from './types';

const { lazyInject } = decorators;

export class SimulationTool implements ISimulationTool {
  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  @lazyInject(TYPES.AppState)
  private _appState!: IAppState;

  @lazyInject(TYPES.GrowthState)
  private _growthState!: IGrowthState;

  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  @lazyInject(TYPES.SettingsState)
  private _settingsState!: ISettingsState;

  private _simulationRequest: ISimulationRequest;
  private _timeouts: number[];
  private _snapshots: ISnapshot[];
  private _passedTime: number;

  constructor(simulationRequest: ISimulationRequest) {
    this._simulationRequest = simulationRequest;
    this._timeouts = [];
    this._snapshots = [];
    this._passedTime = 0;

    for (let i = 0; i < this._simulationRequest.automation.length; i++) {
      this._timeouts[i] = this._simulationRequest.automation[i].startImmediately
        ? 0
        : this._simulationRequest.automation[i].timeout;
    }
  }

  async simulate(): Promise<void> {
    console.log('Started processing');

    const serializedInputState = await this.readInputFile();

    await this._appState.deserialize(serializedInputState);

    let remainingUpdates = this._simulationRequest.updatesPerTick;

    while (this._passedTime <= this._simulationRequest.time) {
      this._appState.simulate();
      this.updateAutomationTimers();

      this._passedTime += this._settingsState.updateInterval;
      remainingUpdates--;

      if (remainingUpdates <= 0) {
        remainingUpdates = this._simulationRequest.updatesPerTick;
        console.log(`[${this._formatter.formatTimeShort(this._passedTime)}] Processing...`);

        await new Promise((resolve) => {
          setTimeout(resolve, this._simulationRequest.cooldownTime);
        });
      }
    }

    await this.writeOutputStateFile();
    await this.writeSnapshotsFile();

    console.log('Finished processing');
  }

  private async readInputFile(): Promise<ISerializedState> {
    const inputFilePath = path.join(
      __dirname,
      '../../cli-data/unzipped-savefiles',
      this._simulationRequest.inputSavefile,
    );

    console.log(`Reading input from the file ${inputFilePath}`);

    const fileContent = await readFile(inputFilePath, { encoding: 'utf8' });

    return JSON.parse(fileContent) as ISerializedState;
  }

  private async writeOutputStateFile(): Promise<void> {
    const outputFilePath = path.join(
      __dirname,
      '../../cli-data/unzipped-savefiles',
      this._simulationRequest.outputSavefile,
    );

    const serializedState = this._appState.serialize();
    const formattedContent = JSON.stringify(serializedState, undefined, '\t');

    await writeFile(outputFilePath, formattedContent, { encoding: 'utf8' });

    console.log(`Written output to the file ${outputFilePath}`);
  }

  private async writeSnapshotsFile(): Promise<void> {
    if (!this._simulationRequest.snapshotsFile) {
      return;
    }

    const outputFilePath = path.join(__dirname, '../../cli-data/snapshots', this._simulationRequest.snapshotsFile);

    const formattedContent = JSON.stringify(this._snapshots, undefined, '\t');

    await writeFile(outputFilePath, formattedContent, { encoding: 'utf8' });

    console.log(`Written snapshots to the file ${outputFilePath}`);
  }

  private updateAutomationTimers(): void {
    for (let i = 0; i < this._simulationRequest.automation.length; i++) {
      this._timeouts[i] -= this._settingsState.updateInterval;

      if (this._timeouts[i] <= 0) {
        this.handleAutomation(this._simulationRequest.automation[i].type);
        this._timeouts[i] = this._simulationRequest.automation[i].timeout;
      }
    }
  }

  private handleAutomation(automationType: SimulationAutomationType): void {
    switch (automationType) {
      case SimulationAutomationType.takeSnapshot:
        this.takeSnapshot();
        break;

      case SimulationAutomationType.upgradeMainframePrograms:
        this.upgradeMainframePrograms();
        break;

      case SimulationAutomationType.upgradeMainframeHardware:
        this.upgradeMainframeHardware();
        break;

      case SimulationAutomationType.upgradeMainframePerformance:
        this.upgradeMainframePerformance();
        break;

      case SimulationAutomationType.upgradeMainframeRam:
        this.upgradeMainframeRam();
        break;

      case SimulationAutomationType.upgradeMainframeCores:
        this.upgradeMainframeCores();
        break;
    }
  }

  private takeSnapshot(): void {
    this._growthState.resetValues();

    this._snapshots.push({
      timestamp: this._passedTime,
      state: this._appState.makeSnapshot(),
    });
  }

  private upgradeMainframePrograms(): void {
    const allPrograms = this._mainframeState.programs.listOwnedPrograms().map((program) => program.name);

    this._mainframeState.programs.upgrader.upgradeMaxPrograms(allPrograms);
  }

  private upgradeMainframeHardware() {
    this._mainframeState.hardware.upgrader.upgradeMaxAllParameters();
  }

  private upgradeMainframePerformance() {
    this._mainframeState.hardware.upgrader.upgradeMaxParameter('performance');
  }

  private upgradeMainframeRam() {
    this._mainframeState.hardware.upgrader.upgradeMaxParameter('ram');
  }

  private upgradeMainframeCores() {
    this._mainframeState.hardware.upgrader.upgradeMaxParameter('cores');
  }
}
