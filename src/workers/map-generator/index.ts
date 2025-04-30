import { XORShift128Plus } from 'random-seedable';
import scenarios from '@configs/scenarios.json';
import {
  IMapGeneratorArgs,
  ILayoutGeneratorResult,
  IDistrictInfoGeneratorResult,
  IDistrictInfoGenerator,
  ILayoutGenerator,
  IMapGeneratorDistrictResult,
  IMapGeneratorResult,
  IDistrictFactionsGenerator,
  IDistrictFactionsGeneratorResult,
} from './interfaces';
import { LayoutGenerator } from './layout-generator';
import { DistrictInfoGenerator } from './district-info-generator';
import { DistrictFactionsGenerator } from './district-factions-generator';

onmessage = async (e: MessageEvent<IMapGeneratorArgs>) => {
  const random = new XORShift128Plus(e.data.randomSeed, e.data.randomShift);

  const mapGenerator: ILayoutGenerator = new LayoutGenerator(e.data.scenario, random);
  const layoutResult: ILayoutGeneratorResult = mapGenerator.generate();

  const districtInfoGenerator: IDistrictInfoGenerator = new DistrictInfoGenerator(e.data.scenario, random);
  const districtInfoResult: IDistrictInfoGeneratorResult = districtInfoGenerator.generate();

  const districtFactionsGenerator: IDistrictFactionsGenerator = new DistrictFactionsGenerator({
    scenario: e.data.scenario,
    layout: layoutResult,
    districtInfos: districtInfoResult,
    random: random,
  });
  const districtFactionResult: IDistrictFactionsGeneratorResult = await districtFactionsGenerator.generate();

  const districts: Record<number, IMapGeneratorDistrictResult> = {};
  const districtsNum = scenarios[e.data.scenario].map.districts.length;

  for (let districtIndex = 0; districtIndex < districtsNum; districtIndex++) {
    districts[districtIndex] = {
      ...layoutResult.districts[districtIndex],
      ...districtFactionResult.districts[districtIndex],
      ...districtInfoResult.districts[districtIndex],
    };
  }

  const mapGeneratorResult: IMapGeneratorResult = {
    districts,
    layout: layoutResult.layout,
    randomShift: random.y,
  };

  postMessage(mapGeneratorResult);
};
