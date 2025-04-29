import { IMapGeneratorDistrictResult } from '@workers/map-generator/interfaces';
import { IPoint } from '@shared/interfaces';
import { DistrictType, Faction } from '@shared/types';
import { IDistrictInfo, IDistrictSerializedInfo } from './interfaces';
import { DistrictState } from './types';

export class DistrictInfo implements IDistrictInfo {
  private _name;
  private _startingPoint: IPoint;
  private _districtType: DistrictType;
  private _faction;
  private _state: DistrictState;

  private constructor() {
    this._name = '';
    this._startingPoint = { x: 0, y: 0 };
    this._districtType = DistrictType.suburb;
    this._faction = Faction.neutral;
    this._state = DistrictState.locked;
  }

  static deserialize(districtSerializedInfo: IDistrictSerializedInfo): IDistrictInfo {
    const districtInfo = new DistrictInfo();
    districtInfo._name = districtSerializedInfo.name;
    districtInfo._startingPoint = districtSerializedInfo.startingPoint;
    districtInfo._districtType = districtSerializedInfo.districtType;
    districtInfo._faction = districtSerializedInfo.faction;
    districtInfo._state = districtSerializedInfo.state;

    return districtInfo;
  }

  static createByMapGenerator(mapGeneratorDistrictResult: IMapGeneratorDistrictResult): IDistrictInfo {
    const districtInfo = new DistrictInfo();
    districtInfo._name = mapGeneratorDistrictResult.name;
    districtInfo._startingPoint = mapGeneratorDistrictResult.startingPoint;
    districtInfo._districtType = mapGeneratorDistrictResult.districtType;
    districtInfo._faction = mapGeneratorDistrictResult.faction;
    districtInfo._state = DistrictState.locked;

    return districtInfo;
  }

  get name(): string {
    return this._name;
  }

  get startingPoint(): IPoint {
    return this._startingPoint;
  }

  get districtType(): DistrictType {
    return this._districtType;
  }

  get faction(): Faction {
    return this._faction;
  }

  get state(): DistrictState {
    return this._state;
  }

  set state(value: DistrictState) {
    this._state = value;
  }

  serialize(): IDistrictSerializedInfo {
    return {
      name: this._name,
      startingPoint: this._startingPoint,
      districtType: this._districtType,
      faction: this._faction,
      state: this._state,
    };
  }
}
