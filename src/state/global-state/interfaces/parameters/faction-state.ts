import { ISerializeable } from '@shared/interfaces/serializable';
import { Faction } from '@shared/types';
import { IFactionSerializedState } from '../serialized-states/factions-serialized-state';
import { IFactionValues } from '../faction-values';

export interface IFactionState extends ISerializeable<IFactionSerializedState> {
  currentFaction?: Faction;
  currentFactionValues?: IFactionValues;
  neutralFactionValues: IFactionValues;
  getFactionValues(faction: Faction): IFactionValues;
}
