export enum MultiplierProgramName {
  codeGenerator = 'codeGenerator',
  circuitDesigner = 'circuitDesigner',
  informationCollector = 'informationCollector',
  dealMaker = 'dealMaker',
}

export enum OtherProgramName {
  shareServer = 'shareServer',
  predictiveComputator = 'predictiveComputator',
  mainframeHardwareAutobuyer = 'mainframeHardwareAutobuyer',
  mainframeProgramsAutobuyer = 'mainframeProgramsAutobuyer',
}

export type ProgramName = MultiplierProgramName | OtherProgramName;
