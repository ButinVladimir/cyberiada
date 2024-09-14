import { XORShift128Plus } from 'random-seedable';
import { v4 as uuid } from 'uuid';
import { IPoint } from '@shared/interfaces';
import { RandomQueue } from '@shared/random-queue';
import {
  IMapGenerator,
  IMapGeneratorResult,
  IMapGeneratorArgs,
  IMapGeneratorDistrict,
  IMapGeneratorDistrictResult,
} from './interfaces';

export class MapGenerator implements IMapGenerator {
  private static DX: number[] = [-1, 1, 0, 0];
  private static DY: number[] = [0, 0, -1, 1];
  private _map: (number | undefined)[][];
  private _districts: Map<number, IMapGeneratorDistrict> = new Map<number, IMapGeneratorDistrict>();
  private _args: IMapGeneratorArgs;
  private _random: XORShift128Plus;

  private get _mapWidth() {
    return this._args.mapWidth;
  }

  private get _mapHeight() {
    return this._args.mapHeight;
  }

  private get _districtsNum() {
    return this._args.districtsNum;
  }

  constructor(mapGeneratorArgs: IMapGeneratorArgs) {
    this._args = mapGeneratorArgs;

    this._map = [];
    for (let x = 0; x < this._mapWidth; x++) {
      const row = [];

      for (let y = 0; y < this._mapHeight; y++) {
        row[y] = undefined;
      }

      this._map[x] = row;
    }

    this._random = new XORShift128Plus(this._args.randomSeed, Date.now());
  }

  public generate(): IMapGeneratorResult {
    this.setStartingPoints();
    this.expandDistricts();

    return this.buildResult();
  }

  private setStartingPoints(): void {
    const startingPoints: IPoint[] = [];

    for (let x = 0; x < this._args.mapWidth; x++) {
      for (let y = 0; y < this._args.mapHeight; y++) {
        startingPoints.push({ x, y });
      }
    }
    this._random.shuffle(startingPoints, true);

    for (let districtNum = 0; districtNum < this._districtsNum; districtNum++) {
      const queue = new RandomQueue<IPoint>(this._random);
      const startingPoint = startingPoints.shift()!;

      this._map[startingPoint.x][startingPoint.y] = districtNum;

      const nextPoints = this.buildNextPoints(startingPoint);
      nextPoints.forEach((nextPoint) => {
        queue.push(nextPoint);
      });

      this._districts.set(districtNum, {
        queue,
        startingPoint,
      });
    }
  }

  private expandDistricts(): void {
    let freeCells = this._mapWidth * this._mapHeight - this._districtsNum;

    while (freeCells > 0) {
      for (let districtNum = 0; districtNum < this._districtsNum; districtNum++) {
        const district = this._districts.get(districtNum);

        while (!district!.queue.isEmpty()) {
          const attemptPoint = district!.queue.pop();

          if (this._map[attemptPoint.x][attemptPoint.y] === undefined) {
            freeCells--;
            this._map[attemptPoint.x][attemptPoint.y] = districtNum;

            const nextPoints = this.buildNextPoints(attemptPoint);
            nextPoints.forEach((nextPoint) => {
              district!.queue.push(nextPoint);
            });
            break;
          }
        }
      }
    }
  }

  private buildResult(): IMapGeneratorResult {
    const districts: Record<number, IMapGeneratorDistrictResult> = {};
    for (const [districtNum, district] of this._districts.entries()) {
      districts[districtNum] = {
        startingPoint: district.startingPoint,
        name: uuid(),
      };
    }

    return {
      map: this._map as number[][],
      districts,
    };
  }

  private buildNextPoints(point: IPoint): IPoint[] {
    const result: IPoint[] = [];

    for (let direction = 0; direction < MapGenerator.DX.length; direction++) {
      const nextPoint = {
        x: point.x + MapGenerator.DX[direction],
        y: point.y + MapGenerator.DY[direction],
      };

      if (nextPoint.x >= 0 && nextPoint.y >= 0 && nextPoint.x < this._mapWidth && nextPoint.y < this._mapHeight) {
        result.push(nextPoint);
      }
    }

    return result;
  }
}
