import { msg } from '@lit/localize';
import { Feature } from '@shared/types';

export const UNLOCKED_FEATURE_TEXTS = {
  [Feature.automation]: {
    title: () => msg('Basic automation'),
    hint: () => msg('Automation page and clone level autoupgrade are available'),
    message: () =>
      msg(`Automation page and clone level autoupgrade settings are now available.
New program is available.
`),
  },
  [Feature.automationMainframeHardware]: {
    title: () => msg('Mainframe hardware automation'),
    hint: () => msg('Mainframe hardware automation settings are available on automation page'),
    message: () =>
      msg(`Mainframe hardware automation settings are now available on automation page.
New program is available.`),
  },
  [Feature.automationMainframePrograms]: {
    title: () => msg('Mainframe programs automation'),
    hint: () => msg('Mainframe programs automation settings are available on automation page'),
    message: () =>
      msg(`Mainframe programs automation settings are now available on automation page.
New program is available.`),
  },
  [Feature.mainframePrograms]: {
    title: () => msg('Mainframe programs'),
    hint: () => msg('Mainframe programs are upgradable'),
    message: () => msg('Mainframe programs are now upgradable.'),
  },
  [Feature.mainframeHardware]: {
    title: () => msg('Mainframe hardware'),
    hint: () => msg('Mainframe hardware is upgradable'),
    message: () => msg('Mainframe hardware is now upgradable.'),
  },
  [Feature.companyManagement]: {
    title: () => msg('Company management'),
    hint: () => msg('Makes possible making clones from templates and sending them to perform sidejobs in the city'),
    message: () =>
      msg(`Company management is now available.
It's now possible to make clones from templates and send them to perform sidejobs in the city.`),
  },
  [Feature.codeBase]: {
    title: () => msg('Code base points'),
    hint: () => msg('Reduces cost of purchasing mainframe programs'),
    message: () =>
      msg(`Code base points are now available.
Increase them to make mainframe programs cheaper.
Multipliers for programs and districts stack.
New contracts, sidejobs and programs are available.`),
  },
  [Feature.computationalBase]: {
    title: () => msg('Computational base points'),
    hint: () => msg('Reduces cost of upgrading mainframe hardware'),
    message: () =>
      msg(`Computational base points are now available.
Increase them to make mainframe hardware cheaper.
Multipliers for programs and districts stack.
New contracts, sidejobs and programs are available.`),
  },
  [Feature.connectivity]: {
    title: () => msg('Connectivity points'),
    hint: () => msg('Increases chances to receive new contracts and sidejobs'),
    message: () =>
      msg(`Connectivity points are now available.
Increase them to unlock more sidejobs and to increase chances of receiving new contracts from selected faction.
Multipliers for programs and districts stack.
New contracts, sidejobs and programs are available.`),
  },
  [Feature.rewards]: {
    title: () => msg('Rewards points'),
    hint: () => msg('Increases rewards from everything'),
    message: () =>
      msg(`Rewards points are now available.
Increase them to get more rewards from everything.
Multipliers for programs and districts stack.
New contracts, sidejobs and programs are available.`),
  },
  [Feature.experienceShare]: {
    title: () => msg('Experience share'),
    hint: () => msg('Clones can share their experience between each other'),
    message: () =>
      msg(`Clone experience is now can be shared between them.
Whenever clone receives experience, all available clones in company will receive part of it.
How big is this part depends on running processes and available synchronization.`),
  },
  [Feature.districtTiers]: {
    title: () => msg('District tiers'),
    hint: () => msg('District tiers and progress to next tier are now visible'),
    message: () =>
      msg(`District tiers and progress to next tier are now visible.
The higher district tier is, the better rewards are from performing actions within it.
Some districts may increase requirements with their tiers.`),
  },
};
