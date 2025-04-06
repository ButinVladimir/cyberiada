import { msg } from "@lit/localize";
import { Feature } from "@shared/types";

interface IUnlockedFeatureTexts {
  title: () => string;
  hint: () => string;
  message: () => string;
}

export const UNLOCKED_FEATURE_TEXTS: Record<Feature, IUnlockedFeatureTexts> = {
  [Feature.automation]: {
    title: () => msg('Automation'),
    hint:() => msg('Automation page is available'),
    message: () => msg('Automation page is now available.'),
  },
  [Feature.automationMainframeHardware]: {
    title: () => msg('Mainframe hardware automation'),
    hint: () => msg('Mainframe hardware automation settings are available on automation page'),
    message: () => msg('Mainframe hardware automation settings are now available on automation page.'),
  },
  [Feature.automationMainframePrograms]: {
    title: () => msg('Mainframe programs automation'),
    hint: () => msg('Mainframe programs automation settings are available on automation page'),
    message: () => msg('Mainframe programs automation settings are now available on automation page.'),
  },
  [Feature.mainframeUpgrades]: {
    title: () => msg('Mainframe upgrades'),
    hint: () => msg('Mainframe hardware and programs are upgradable'),
    message: () => msg('Mainframe hardware and programs are now upgradable.'),
  },
  [Feature.companyManagement]: {
    title: () => msg('Company management'),
    hint: () => msg('Makes possible making clones from templates and sending them to perform side jobs in the city'),
    message: () => msg(`Company management is now available.
It's now possible to make clones from templates and send them to perform side jobs in the city.`),
  },
  [Feature.codeBasePoints]: {
    title: () => msg('Code base points'),
    hint: () => msg('Reduces cost of purchasing mainframe programs'),
    message: () => msg(`Code base points are now available.
Increase them to make mainframe programs cheaper.
Multipliers for programs and districts stack.`),
  },
  [Feature.computationalBasePoints]: {
    title: () => msg('Computational base points'),
    hint: () => msg('Reduces cost of upgrading mainframe hardware'),
    message: () => msg(`Computational base points are now available.
Increase them to make mainframe hardware cheaper.
Multipliers for programs and districts stack.`),
  },
  [Feature.connectivityPoints]: {
    title: () => msg('Connectivity points'),
    hint: () => msg('Increases chances to receive new contracts and sidejobs'),
    message: () => msg(`Connectivity points are now available.
Increase them to make everything cheaper and to increase chances of receiving new contracts from selected faction.
Multipliers for programs and districts stack.`),
  },
  [Feature.rewardsPoints]: {
    title: () => msg('Rewards points'),
    hint: () => msg('Increases rewards from everything'),
    message: () => msg(`Rewards points are now available.
Increase them to get more rewards from everything.
Multipliers for programs and districts stack.`),
  },
  [Feature.experienceShare]: {
    title: () => msg('Experience share'),
    hint: () => msg('Clones can earn additional experience when there is an unused synchronization'),
    message: () => msg(`Clones now can earn additional experience when there is an unused synchronization.
Additional experience amount depends on how bigger total synchronization is to used.`),
  },
};
