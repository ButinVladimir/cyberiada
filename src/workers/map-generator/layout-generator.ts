import { XORShift128Plus } from 'random-seedable';
import scenarios from '@configs/scenarios.json';
import { IPoint } from '@shared/interfaces';
import { Scenario } from '@shared/types';
import { RandomQueue } from '@shared/random-queue';
import {
  ILayoutGenerator,
  ILayoutGeneratorResult,
  ILayoutGeneratorDistrict,
  ILayoutGeneratorDistrictResult,
} from './interfaces';

export class LayoutGenerator implements ILayoutGenerator {
  private static DX: number[] = [-1, 1, 0, 0];
  private static DY: number[] = [0, 0, -1, 1];
  private _scenario: Scenario;
  private _map: (number | undefined)[][];
  private _districts: Map<number, ILayoutGeneratorDistrict> = new Map<number, ILayoutGeneratorDistrict>();
  private _random: XORShift128Plus;

  private get _mapWidth() {
    return scenarios[this._scenario].map.width;
  }

  private get _mapHeight() {
    return scenarios[this._scenario].map.height;
  }

  private get _districtsNum() {
    return scenarios[this._scenario].map.districts.length;
  }

  constructor(scenario: Scenario, random: XORShift128Plus) {
    this._scenario = scenario;

    this._map = [];
    for (let x = 0; x < this._mapWidth; x++) {
      const row = [];

      for (let y = 0; y < this._mapHeight; y++) {
        row[y] = undefined;
      }

      this._map[x] = row;
    }

    this._random = random;
  }

  public generate(): ILayoutGeneratorResult {
    this.setStartingPoints();
    this.expandDistricts();

    return this.buildResult();
  }

  private setStartingPoints(): void {
    const startingPoints: IPoint[] = [];

    for (let x = 0; x < this._mapWidth; x++) {
      for (let y = 0; y < this._mapHeight; y++) {
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

  private buildResult(): ILayoutGeneratorResult {
    const districts: Record<number, ILayoutGeneratorDistrictResult> = {};
    for (const [districtNum, district] of this._districts.entries()) {
      districts[districtNum] = {
        startingPoint: district.startingPoint,
      };
    }

    return {
      layout: this._map as number[][],
      districts,
    };
  }

  private buildNextPoints(point: IPoint): IPoint[] {
    const result: IPoint[] = [];

    for (let direction = 0; direction < LayoutGenerator.DX.length; direction++) {
      const nextPoint = {
        x: point.x + LayoutGenerator.DX[direction],
        y: point.y + LayoutGenerator.DY[direction],
      };

      if (nextPoint.x >= 0 && nextPoint.y >= 0 && nextPoint.x < this._mapWidth && nextPoint.y < this._mapHeight) {
        result.push(nextPoint);
      }
    }

    return result;
  }
}
