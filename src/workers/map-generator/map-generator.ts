import { XORShift128Plus } from 'random-seedable';
import { v4 as uuid } from 'uuid';
import constants from '@configs/constants.json';
import { IPoint } from '@shared/interfaces';
import { RandomQueue } from '@shared/random-queue';
import {
  IMapGenerator,
  IMapGeneratorResult,
  IMapGeneratorArgs,
  IMapGeneratorDistrict,
  IMapGeneratorDistrictResult,
} from './interfaces';
import scenarios from '@configs/scenarios.json';

export class MapGenerator implements IMapGenerator {
  private static DX: number[] = [-1, 1, 0, 0];
  private static DY: number[] = [0, 0, -1, 1];
  private _map: (number | undefined)[][];
  private _districts: Map<number, IMapGeneratorDistrict> = new Map<number, IMapGeneratorDistrict>();
  private _args: IMapGeneratorArgs;
  private _random: XORShift128Plus;

  constructor(mapGeneratorArgs: IMapGeneratorArgs) {
    this._args = mapGeneratorArgs;

    this._map = [];
    for (let x = 0; x < constants.mapWidth; x++) {
      const row = [];

      for (let y = 0; y < constants.mapHeight; y++) {
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
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!scenarios[this._args.scenario]) {
      throw new Error(`Unable to generate map for scenario ${this._args.scenario}`);
    }

    const startingPoints: IPoint[] = [];

    for (let x = 0; x < constants.mapWidth; x++) {
      for (let y = 0; y < constants.mapHeight; y++) {
        startingPoints.push({ x, y });
      }
    }
    this._random.shuffle(startingPoints, true);

    const { districtsNum } = scenarios[this._args.scenario];
    for (let districtNum = 0; districtNum < districtsNum; districtNum++) {
      const queue = new RandomQueue<IPoint>(this._random);
      const startingPoint = startingPoints.shift()!;

      this._map[startingPoint.x][startingPoint.y] = districtNum;

      const nextPoints = MapGenerator._buildNextPoints(startingPoint);
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
    let freeCells = constants.mapWidth * constants.mapHeight - scenarios[this._args.scenario].districtsNum;
    const { districtsNum } = scenarios[this._args.scenario];

    while (freeCells > 0) {
      for (let districtNum = 0; districtNum < districtsNum; districtNum++) {
        const district = this._districts.get(districtNum);

        while (!district!.queue.isEmpty()) {
          const attemptPoint = district!.queue.pop();

          if (this._map[attemptPoint.x][attemptPoint.y] === undefined) {
            freeCells--;
            this._map[attemptPoint.x][attemptPoint.y] = districtNum;

            const nextPoints = MapGenerator._buildNextPoints(attemptPoint);
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

  private static _buildNextPoints(point: IPoint): IPoint[] {
    const result: IPoint[] = [];

    for (let direction = 0; direction < MapGenerator.DX.length; direction++) {
      const nextPoint = {
        x: point.x + MapGenerator.DX[direction],
        y: point.y + MapGenerator.DY[direction],
      };

      if (
        nextPoint.x >= 0 &&
        nextPoint.y >= 0 &&
        nextPoint.x < constants.mapWidth &&
        nextPoint.y < constants.mapHeight
      ) {
        result.push(nextPoint);
      }
    }

    return result;
  }
}
