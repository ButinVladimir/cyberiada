import { injectable } from 'inversify';
import { merge } from 'lodash';
import { Scenario } from '@shared/types';
import constants from '@configs/constants.json';
import scenarios from '@configs/scenarios.json';
import { IScenarioValues, IScenarioSerializedState, IScenarioState } from './interfaces';

@injectable()
export class ScenarioState implements IScenarioState {
  private _scenario: Scenario;
  private _currentValues: IScenarioValues;

  constructor() {
    this._scenario = constants.startingScenario as Scenario;
    this._currentValues = this.getScenarioValues(this._scenario);
  }

  get scenario() {
    return this._scenario;
  }

  set scenario(value: Scenario) {
    this._scenario = value;
    this._currentValues = this.getScenarioValues(value);
  }

  get currentValues() {
    return this._currentValues;
  }

  getScenarioValues(scenario: Scenario): IScenarioValues {
    return merge({}, constants.defaultScenarioSettings, scenarios[scenario]) as IScenarioValues;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this.scenario = constants.startingScenario as Scenario;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IScenarioSerializedState): Promise<void> {
    this.scenario = serializedState.scenario;
  }

  serialize(): IScenarioSerializedState {
    return {
      scenario: this._scenario,
    };
  }
}
