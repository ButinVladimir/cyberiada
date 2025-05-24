export enum MultiplierProgramName {
  codeGenerator = 'codeGenerator',
  circuitDesigner = 'circuitDesigner',
  dealMaker = 'dealMaker',
  informationCollector = 'informationCollector',
}

export enum AutobuyerProgramName {
  mainframeHardwareAutobuyer = 'mainframeHardwareAutobuyer',
  mainframeProgramsAutobuyer = 'mainframeProgramsAutobuyer',
  cloneLevelAutoupgrader = 'cloneLevelAutoupgrader',
}

export enum OtherProgramName {
  shareServer = 'shareServer',
  predictiveComputator = 'predictiveComputator',
  peerReviewer = 'peerReviewer',
}

export type ProgramName = MultiplierProgramName | AutobuyerProgramName | OtherProgramName;
