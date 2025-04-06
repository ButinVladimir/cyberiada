import { msg } from "@lit/localize";
import { StoryGoalStateFilter } from "./types";

export const STORY_GOAL_STATE_FILTER_TITLES: Record<StoryGoalStateFilter, () => string> = {
  all: () => msg('All events'),
  available: () => msg('Only available events'),
  notAvailable: () => msg('Only unavailable events'),
  passed: () => msg('Only passed events'),
};