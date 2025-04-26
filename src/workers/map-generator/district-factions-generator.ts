import { XORShift128Plus } from 'random-seedable';
import scenarios from '@configs/scenarios.json';
import { Faction, Scenario } from '@shared/types';
import { RandomQueue } from '@shared/random-queue';
import {
  IDistrictFactionsGenerator,
  IDistrictFactionsGeneratorDistrictResult,
  IDistrictFactionsGeneratorResult,
} from './interfaces';
import { IDistrictConnectionGraphBuilderResult } from '../district-connection-graph-builder/interfaces/district-connection-graph-builder-result';

export class DistrictFactionsGenerator implements IDistrictFactionsGenerator {
  private _scenario: Scenario;
  private _layout: number[][];
  private _random: XORShift128Plus;
  private _connectionsGraph!: IDistrictConnectionGraphBuilderResult;
  private _districtFactions: Map<number, Faction>;
  private _controlledAreaMap: Map<Faction, number>;
  private _districtQueues: Map<Faction, RandomQueue<number>>;

  constructor(scenario: Scenario, layout: number[][], random: XORShift128Plus) {
    this._scenario = scenario;
    this._layout = layout;
    this._random = random;

    this._districtFactions = new Map<number, Faction>();
    this._controlledAreaMap = new Map<Faction, number>();
    this._districtQueues = new Map<Faction, RandomQueue<number>>();
  }

  async generate(): Promise<IDistrictFactionsGeneratorResult> {
    await this.generateConnectionsGraph();

    this.initData();
    this.expandFactions();
    this.markRemainingDistrictsAsNeutral();

    const districtsNum = scenarios[this._scenario].map.districts.length;
    const districts: IDistrictFactionsGeneratorDistrictResult[] = [];

    for (let i = 0; i < districtsNum; i++) {
      districts.push({
        faction: this._districtFactions.get(i)!,
      });
    }

    return {
      districts,
    };
  }

  initData() {
    const mapData = scenarios[this._scenario].map;

    for (const factionData of mapData.factions) {
      const faction = factionData.name as Faction;
      const startingDistrict = factionData.startingDistrict;
      const districtQueue = new RandomQueue<number>(this._random);

      this.pushConnectedNeigbours(startingDistrict, districtQueue);

      this._districtFactions.set(startingDistrict, faction);
      this._controlledAreaMap.set(
        faction,
        factionData.controlledArea - this._connectionsGraph.districtSizes.get(startingDistrict)!,
      );
      this._districtQueues.set(faction, districtQueue);
    }

    this._districtFactions.set(mapData.startingDistrict, Faction.neutral);
  }

  private pushConnectedNeigbours(district: number, districtQueue: RandomQueue<number>) {
    for (const connectedDistrict of this._connectionsGraph.connections.get(district)!.values()) {
      districtQueue.push(connectedDistrict);
    }
  }

  private expandFactions() {
    const factions = scenarios[this._scenario].map.factions;

    let expanded = true;

    while (expanded) {
      expanded = false;

      for (const factionData of factions) {
        const faction = factionData.name as Faction;
        const districtQueue = this._districtQueues.get(faction)!;

        while (!districtQueue.isEmpty()) {
          const nextDistrict = districtQueue.pop();
          const factionControlledArea = this._controlledAreaMap.get(faction)!;
          const districtSize = this._connectionsGraph.districtSizes.get(nextDistrict)!;

          if (!this._districtFactions.has(nextDistrict) && factionControlledArea >= districtSize) {
            this._controlledAreaMap.set(faction, factionControlledArea - districtSize);
            this._districtFactions.set(nextDistrict, faction);
            this.pushConnectedNeigbours(nextDistrict, districtQueue);

            expanded = true;
            break;
          }
        }
      }
    }
  }

  private markRemainingDistrictsAsNeutral() {
    const districtsNum = scenarios[this._scenario].map.districts.length;

    for (let i = 0; i < districtsNum; i++) {
      if (!this._districtFactions.has(i)) {
        this._districtFactions.set(i, Faction.neutral);
      }
    }
  }

  private generateConnectionsGraph(): Promise<void> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('@workers/district-connection-graph-builder/index.js', import.meta.url), {
        type: 'module',
      });

      worker.addEventListener('message', (event: MessageEvent<IDistrictConnectionGraphBuilderResult>) => {
        this._connectionsGraph = event.data;
        resolve();
      });

      worker.addEventListener('error', (event: ErrorEvent) => {
        reject(event.error);
      });

      worker.addEventListener('messageerror', () => {
        reject('Unable to parse district connection graph builder message');
      });

      worker.postMessage({
        scenario: this._scenario,
        layout: this._layout,
      });
    });
  }
}
