import { msg, str } from '@lit/localize';
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
Passively generates money and development points.`),
  },
  [MultiplierProgramName.codeGenerator]: {
    title: () => msg('Code generator'),
    overview: () =>
      msg(`Program to develop other programs.
Generates code base points and improves mainframe programs cost divisor.`),
  },
  [MultiplierProgramName.circuitDesigner]: {
    title: () => msg('Circuit designer'),
    overview: () =>
      msg(`Program to develop circuit designs.
Generates computational base points and improves mainframe hardware cost divisor.`),
  },
  [MultiplierProgramName.dealMaker]: {
    title: () => msg('Deal maker'),
    overview: () =>
      msg(`Program to assist with making deals.
Generates rewards points and improves all rewards.`),
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
  [OtherProgramName.informationCollector]: {
    title: () => msg('Information collector'),
    overview: () =>
      msg(`Program to collect all sorts of information.
Generates connectivity points and improves chances to receive new contracts and sidejobs.`),
  },
};

export const PROGRAM_DESCRIPTION_TEXTS = {
  requirementsProcess: (threads: string) => msg(str`Requirements for ${threads} threads`),
  requirementsDiff: (threads: string, threadsDiff: string) =>
    msg(str`Requirements for ${threads} (${threadsDiff}) threads`),
  requirementsAutoscalable: () => msg('Requirements for autoscalable program'),
  requirementsSingle: () => msg('Requirements for single thread'),
  ram: (ram: string) => msg(str`RAM: ${ram}`),
  ramDiff: (ram: string, availableRam: string, ramDiff: string) => msg(str`RAM: ${ram} / ${availableRam} (${ramDiff})`),
  ramAllUnused: () => msg('RAM: 1 + All available'),
  cores: (cores: string) => msg(str`Cores: Up to ${cores}`),
  coresDiff: (cores: string, coresDiff: string) => msg(str`Cores: Up to ${cores} (${coresDiff})`),
  coresAllUnused: () => msg('Cores: 1 + All available'),
  completionTimeAutoscalable: () => msg('Completion time: Instant'),
  completionTimeNever: () => msg('Completion time: Never'),
  completionTimeProcess: (time: string) => msg(str`Completion time: ${time}`),
  completionTimeDiff: (minTime: string, maxTime: string, minTimeDiff: string, maxTimeDiff: string) =>
    msg(str`Completion time: ${minTime} \u2014 ${maxTime} (${minTimeDiff} \u2014 ${maxTimeDiff})`),
  completionTimeProgram: (minTime: string, maxTime: string) => msg(str`Completion time: ${minTime} \u2014 ${maxTime}`),
};
