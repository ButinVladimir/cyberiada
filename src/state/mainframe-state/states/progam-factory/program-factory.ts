import { injectable } from 'inversify';
import { IBaseProgramParameters, IMakeProgramParameters, IProgram, IProgramFactory } from './interfaces';
import { OtherProgramName, MultiplierProgramName, AutobuyerProgramName } from './types';
import {
  ShareServerProgram,
  CodeGeneratorProgram,
  PredictiveComputatorProgram,
  MainframeHardwareAutobuyerProgram,
  MainframeProgramsAutobuyerProgram,
  CircuitDesignerProgram,
  InformationCollectorProgram,
  DealMakerProgram,
  CloneLevelAutoupgraderProgram,
  PeerReviewerProgram,
} from './programs';

@injectable()
export class ProgramFactory implements IProgramFactory {
  makeProgram(parameters: IMakeProgramParameters): IProgram {
    const program: IProgram = this.makeProgramImplementation(parameters);

    return program;
  }

  private makeProgramImplementation(parameters: IMakeProgramParameters): IProgram {
    const baseParameters: IBaseProgramParameters = {
      level: parameters.level,
      tier: parameters.tier,
      autoUpgradeEnabled: parameters.autoUpgradeEnabled,
    };

    switch (parameters.name) {
      case OtherProgramName.shareServer:
        return new ShareServerProgram(baseParameters);

      case MultiplierProgramName.codeGenerator:
        return new CodeGeneratorProgram(baseParameters);

      case MultiplierProgramName.circuitDesigner:
        return new CircuitDesignerProgram(baseParameters);

      case MultiplierProgramName.dealMaker:
        return new DealMakerProgram(baseParameters);

      case MultiplierProgramName.informationCollector:
        return new InformationCollectorProgram(baseParameters);

      case OtherProgramName.predictiveComputator:
        return new PredictiveComputatorProgram(baseParameters);

      case AutobuyerProgramName.mainframeHardwareAutobuyer:
        return new MainframeHardwareAutobuyerProgram(baseParameters);

      case AutobuyerProgramName.mainframeProgramsAutobuyer:
        return new MainframeProgramsAutobuyerProgram(baseParameters);

      case AutobuyerProgramName.cloneLevelAutoupgrader:
        return new CloneLevelAutoupgraderProgram(baseParameters);

      case OtherProgramName.peerReviewer:
        return new PeerReviewerProgram(baseParameters);
    }
  }
}
