import { msg } from '@lit/localize';

export const STORY_MESSAGES: Record<string, () => string> = {
  tutorial_level_1: () =>
    msg(`You have been tasked with creating new company. However, the only resource you have is some low tier mainframe.
Perhaps, you can share it to get some money?`),
  tutorial_level_2: () =>
    msg(`The more you share, the harder it becomes to raise your development level.
You need to upgrade what you already have.`),
  tutorial_level_15: () =>
    msg(`Now that you raised your development high enough, it's time to operate in the city.
You need to hire mercenaries for that. However, you cannot get too much attention
so you need to focus on non-combat activities. Perhaps, diplomacy will be good?`),
};
