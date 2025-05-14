export enum MultiplierProgramName {
  codeGenerator = 'codeGenerator',
  circuitDesigner = 'circuitDesigner',
  dealMaker = 'dealMaker',
}

export enum OtherProgramName {
  shareServer = 'shareServer',
  predictiveComputator = 'predictiveComputator',
  mainframeHardwareAutobuyer = 'mainframeHardwareAutobuyer',
  mainframeProgramsAutobuyer = 'mainframeProgramsAutobuyer',
  informationCollector = 'informationCollector',
}

export type ProgramName = MultiplierProgramName | OtherProgramName;
