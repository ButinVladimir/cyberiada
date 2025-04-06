import { msg } from '@lit/localize';
import {
  MultiplierProgramName,
  OtherProgramName,
  ProgramName,
} from '@state/mainframe-state/states/progam-factory/types';

interface IProgramTexts {
  title: () => string;
  overview: () => string;
}

export const PROGRAM_TEXTS: Record<ProgramName, IProgramTexts> = {
  [OtherProgramName.shareServer]: {
    title: () => msg('Mainframe share server'),
    overview: () =>
      msg(`Program to share your mainframe capabilities to city network.
Passively generates money and development points (DP).`),
  },
  [MultiplierProgramName.codeGenerator]: {
    title: () => msg('Code generator'),
    overview: () =>
      msg(`Program to develop other programs.
Generates code base points (CBP) and improves mainframe programs cost divisor.`),
  },
  [MultiplierProgramName.circuitDesigner]: {
    title: () => msg('Circuit designer'),
    overview: () =>
      msg(`Program to develop circuit designs.
Generates computational base points (CBP) and improves mainframe hardware cost divisor.`),
  },
  [MultiplierProgramName.informationCollector]: {
    title: () => msg('Information collector'),
    overview: () =>
      msg(`Program to collect all sorts of information.
Generates connectivity points (CP) and improves chances to receive new contracts and sidejobs.`),
  },
  [MultiplierProgramName.dealMaker]: {
    title: () => msg('Deal maker'),
    overview: () =>
      msg(`Program to assist with making deals.
Generates rewards points (RP) and improves all rewards.`),
  },
  [OtherProgramName.predictiveComputator]: {
    title: () => msg('Predictive computator'),
    overview: () => msg('Program to speed up completion of currently running processes.'),
  },
  [OtherProgramName.mainframeHardwareAutobuyer]: {
    title: () => msg('Mainframe hardware autobuyer'),
    overview: () => msg('Program to automatically buy mainframe hardware upgrades.'),
  },
  [OtherProgramName.mainframeProgramsAutobuyer]: {
    title: () => msg('Mainframe programs autobuyer'),
    overview: () => msg('Program to automatically buy mainframe programs.'),
  },
};
