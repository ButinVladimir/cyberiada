import { ISerializedState } from './serialized-state';

export interface IMigrator {
  hasMigrated: boolean;
  migrate(parsedSaveData: any): ISerializedState | undefined;
}
