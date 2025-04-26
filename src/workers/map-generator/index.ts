import { XORShift128Plus } from 'random-seedable';
import scenarios from '@configs/scenarios.json';
import {
  IMapGeneratorArgs,
  ILayoutGeneratorResult,
  IDistrictNamesGeneratorResult,
  IDistrictNamesGenerator,
  ILayoutGenerator,
  IMapGeneratorDistrictResult,
  IMapGeneratorResult,
  IDistrictFactionsGenerator,
  IDistrictFactionsGeneratorResult,
} from './interfaces';
import { LayoutGenerator } from './layout-generator';
import { DistrictNamesGenerator } from './district-names-generator';
import { DistrictFactionsGenerator } from './district-factions-generator';

onmessage = async (e: MessageEvent<IMapGeneratorArgs>) => {
  const random = new XORShift128Plus(e.data.randomSeed, e.data.randomShift);

  const mapGenerator: ILayoutGenerator = new LayoutGenerator(e.data.scenario, random);
  const layoutResult: ILayoutGeneratorResult = mapGenerator.generate();

  const districtNamesGenerator: IDistrictNamesGenerator = new DistrictNamesGenerator(e.data.scenario, random);
  const districtNamesResult: IDistrictNamesGeneratorResult = districtNamesGenerator.generate();

  const districtFactionsGenerator: IDistrictFactionsGenerator = new DistrictFactionsGenerator(
    e.data.scenario,
    layoutResult.layout,
    random,
  );
  const districtFactionResult: IDistrictFactionsGeneratorResult = await districtFactionsGenerator.generate();

  const districts: Record<number, IMapGeneratorDistrictResult> = {};
  const districtsNum = scenarios[e.data.scenario].map.districts.length;

  for (let districtIndex = 0; districtIndex < districtsNum; districtIndex++) {
    districts[districtIndex] = {
      startingPoint: layoutResult.districts[districtIndex].startingPoint,
      name: districtNamesResult.districts[districtIndex].name,
      faction: districtFactionResult.districts[districtIndex].faction,
    };
  }

  const mapGeneratorResult: IMapGeneratorResult = {
    districts,
    layout: layoutResult.layout,
    randomShift: random.y,
  };

  postMessage(mapGeneratorResult);
};
