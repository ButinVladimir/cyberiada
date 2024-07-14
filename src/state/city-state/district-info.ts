import { IMapGeneratorDistrictResult } from '@/workers/map-generator/interfaces';
import { IPoint } from '@shared/interfaces';
import { IDistrictInfo, IDistrictSerializedInfo } from './interfaces';

export class DistrictInfo implements IDistrictInfo {
  private _name = '';
  private _startingPoint: IPoint = { x: 0, y: 0 };

  private constructor() {}

  static deserialize(districtSerializedInfo: IDistrictSerializedInfo): IDistrictInfo {
    const districtInfo = new DistrictInfo();
    districtInfo._name = districtSerializedInfo.name;
    districtInfo._startingPoint = districtSerializedInfo.startingPoint;

    return districtInfo;
  }

  static deserializeMapGeneratorResult(mapGeneratorDistrictResult: IMapGeneratorDistrictResult): IDistrictInfo {
    const districtInfo = new DistrictInfo();
    districtInfo._name = mapGeneratorDistrictResult.name;
    districtInfo._startingPoint = mapGeneratorDistrictResult.startingPoint;

    return districtInfo;
  }

  get name(): string {
    return this._name;
  }

  get startingPoint(): IPoint {
    return {
      x: this._startingPoint.x,
      y: this._startingPoint.y,
    };
  }

  serialize(): IDistrictSerializedInfo {
    return {
      name: this._name,
      startingPoint: this._startingPoint,
    };
  }
}
