import { BaseController } from '@shared/base-controller';
import { IStoryEvent } from '@state/scenario-state/interfaces/story-event';

export class TopBarAvailableGoalsController extends BaseController {
  listAvailableGoals(): IStoryEvent[] {
    return this.globalState.storyEvents.listAvailableGoals();
  }
}
