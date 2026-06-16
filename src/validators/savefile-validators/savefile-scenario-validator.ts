import { injectable } from 'inversify';
import { styleText } from 'node:util';
import { IScenarioSerializedState, typedScenarios, typedStoryEvents } from '@state/scenario-state';
import { ISavefileScenarioValidator } from '../interfaces';

@injectable()
export class SavefileScenarioValidator implements ISavefileScenarioValidator {
  private _currentState!: IScenarioSerializedState;

  validate(state: IScenarioSerializedState): void {
    console.log(`\t\tValidating scenario serialized state`);

    this._currentState = state;

    this.validateCurrentScenario();
    this.validateStoryEvents();
  }

  private validateCurrentScenario() {   
    if (!typedScenarios[this._currentState.currentScenario]) {
      console.log(
        `\t\t\tCurrent scenario ${styleText('cyanBright', this._currentState.currentScenario)} is ${styleText('redBright', 'missing')}`,
      );
    }
  }

  private validateStoryEvents() {
    this._currentState.storyEvents.visitedAllEvents.forEach((storyEvent) => {
      this.validateStoryEvent(storyEvent, 'all visited events');
    });
    this._currentState.storyEvents.visitedScenarioEvents.forEach((storyEvent) => {
      this.validateStoryEvent(storyEvent, 'visited events in current scenario');
    })
  }

  private validateStoryEvent(storyEventName: string, category: string) {   
    if (!typedStoryEvents[storyEventName]) {
      console.log(
        `\t\t\tStory event ${styleText('cyanBright', storyEventName)} in ${category} is ${styleText('redBright', 'missing')}`,
      );
    }
  }
}
