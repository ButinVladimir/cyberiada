import { MainValidatorFacade } from './main-validator-facade';
import {
  ProgramValidator,
  NameValidator,
  ThemeValidator,
  CloneTemplateValidator,
  SidejobValidator,
  DistrictTypeValidator,
  StoryEventsValidator,
  ScenariosValidator,
  FactionValidator,
  ConstantsValidator,
  ContractValidator,
} from './implementations';
import {
  CloneTemplateValidatorFacade,
  SidejobValidatorFacade,
  DistrictTypeValidatorFacade,
  FactionValidatorFacade,
  ConstantsValidatorFacade,
  ProgramValidatorFacade,
  NameValidatorFacade,
  ThemeValidatorFacade,
  StoryEventsValidatorFacade,
  ScenariosValidatorFacade,
  ContractValidatorFacade,
} from './facades';
import {
  IValidatorFacade,
  IMainValidatorFacade,
  ICloneTemplateValidator,
  ISidejobValidator,
  IDistrictTypeValidator,
  IFactionValidator,
  IConstantsValidator,
  IProgramValidator,
  INameValidator,
  IThemeValidator,
  IStoryEventsValidator,
  IScenariosValidator,
  IContractValidator,
  ISavefileValidator,
  ISavefileScenarioValidator,
  ISavefileValidatorFacade,
  ISavefileFactionValidator,
  ISavefileUnlockValidator,
  ISavefileClonesValidator,
  ISavefileCityValidator,
  ISavefileMainframeValidator,
  ISavefileAutomationValidator,
  ISavefileActivityValidator,
} from './interfaces';
import {
  SavefileValidator,
  SavefileScenarioValidator,
  SavefileUnlockValidator,
  SavefileFactionValidator,
  SavefileClonesValidator,
  SavefileCityValidator,
  SavefileMainframeValidator,
  SavefileAutomationValidator,
  SavefileActivityValidator,
} from './savefile-validators';
import { SavefileValidatorFacade } from './savefile-validator-facade';
import { validatorContainer } from './container';
import { VALIDATOR_TYPES } from './types';

validatorContainer
  .bind<IMainValidatorFacade>(VALIDATOR_TYPES.MainValidatorFacade)
  .to(MainValidatorFacade)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IValidatorFacade>(VALIDATOR_TYPES.ProgramValidatorFacade)
  .to(ProgramValidatorFacade)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IProgramValidator>(VALIDATOR_TYPES.ProgramValidator)
  .to(ProgramValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IValidatorFacade>(VALIDATOR_TYPES.NameValidatorFacade)
  .to(NameValidatorFacade)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<INameValidator>(VALIDATOR_TYPES.NameValidator)
  .to(NameValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IValidatorFacade>(VALIDATOR_TYPES.ThemeValidatorFacade)
  .to(ThemeValidatorFacade)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IThemeValidator>(VALIDATOR_TYPES.ThemeValidator)
  .to(ThemeValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IValidatorFacade>(VALIDATOR_TYPES.CloneTemplateValidatorFacade)
  .to(CloneTemplateValidatorFacade)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<ICloneTemplateValidator>(VALIDATOR_TYPES.CloneTemplateValidator)
  .to(CloneTemplateValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IValidatorFacade>(VALIDATOR_TYPES.SidejobValidatorFacade)
  .to(SidejobValidatorFacade)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<ISidejobValidator>(VALIDATOR_TYPES.SidejobValidator)
  .to(SidejobValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IValidatorFacade>(VALIDATOR_TYPES.ContractValidatorFacade)
  .to(ContractValidatorFacade)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IContractValidator>(VALIDATOR_TYPES.ContractValidator)
  .to(ContractValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IValidatorFacade>(VALIDATOR_TYPES.DistrictTypeValidatorFacade)
  .to(DistrictTypeValidatorFacade)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IDistrictTypeValidator>(VALIDATOR_TYPES.DistrictTypeValidator)
  .to(DistrictTypeValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IValidatorFacade>(VALIDATOR_TYPES.FactionValidatorFacade)
  .to(FactionValidatorFacade)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IFactionValidator>(VALIDATOR_TYPES.FactionValidator)
  .to(FactionValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IValidatorFacade>(VALIDATOR_TYPES.ConstantsValidatorFacade)
  .to(ConstantsValidatorFacade)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IConstantsValidator>(VALIDATOR_TYPES.ConstantsValidator)
  .to(ConstantsValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IValidatorFacade>(VALIDATOR_TYPES.StoryEventsValidatorFacade)
  .to(StoryEventsValidatorFacade)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IStoryEventsValidator>(VALIDATOR_TYPES.StoryEventsValidator)
  .to(StoryEventsValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IValidatorFacade>(VALIDATOR_TYPES.ScenariosValidatorFacade)
  .to(ScenariosValidatorFacade)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<IScenariosValidator>(VALIDATOR_TYPES.ScenariosValidator)
  .to(ScenariosValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<ISavefileScenarioValidator>(VALIDATOR_TYPES.SavefileScenarioValidator)
  .to(SavefileScenarioValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<ISavefileFactionValidator>(VALIDATOR_TYPES.SavefileFactionValidator)
  .to(SavefileFactionValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<ISavefileUnlockValidator>(VALIDATOR_TYPES.SavefileUnlockValidator)
  .to(SavefileUnlockValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<ISavefileClonesValidator>(VALIDATOR_TYPES.SavefileClonesValidator)
  .to(SavefileClonesValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<ISavefileCityValidator>(VALIDATOR_TYPES.SavefileCityValidator)
  .to(SavefileCityValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<ISavefileMainframeValidator>(VALIDATOR_TYPES.SavefileMainframeValidator)
  .to(SavefileMainframeValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<ISavefileAutomationValidator>(VALIDATOR_TYPES.SavefileAutomationValidator)
  .to(SavefileAutomationValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<ISavefileActivityValidator>(VALIDATOR_TYPES.SavefileActivityValidator)
  .to(SavefileActivityValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<ISavefileValidator>(VALIDATOR_TYPES.SavefileValidator)
  .to(SavefileValidator)
  .inSingletonScope()
  .whenDefault();

validatorContainer
  .bind<ISavefileValidatorFacade>(VALIDATOR_TYPES.SavefileValidatorFacade)
  .to(SavefileValidatorFacade)
  .inSingletonScope()
  .whenDefault();
