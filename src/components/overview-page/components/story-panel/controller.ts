import { BaseController } from '@shared/base-controller';
import { IStoryGoal } from '@state/global-state/interfaces/story-goal';

export class OverviewStoryPanelController extends BaseController {
  listGoals(): IStoryGoal[] {
    return this.globalState.storyEvents.listGoals();
  }
}
