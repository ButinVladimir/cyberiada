/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CURRENT_VERSION } from '@shared/constants';
import { GameVersion } from '@shared/types';
import { IMigration, IMigrator, ISerializedState } from './interfaces';
import { ResetStateMigration } from './migrations';

export class Migrator implements IMigrator {
  private _hasMigrated = false;

  get hasMigrated() {
    return this._hasMigrated;
  }

  migrate(parsedSaveData: any): ISerializedState | undefined {
    let migratedSaveData: any = parsedSaveData;

    while (migratedSaveData && migratedSaveData.gameVersion !== CURRENT_VERSION) {
      this._hasMigrated = true;

      const migration = this.getMigration(migratedSaveData.gameVersion);

      migratedSaveData = migration.migrate(migratedSaveData);
    }

    return migratedSaveData as ISerializedState | undefined;
  }

  private getMigration(version: GameVersion): IMigration {
    switch (version) {
      default:
        return new ResetStateMigration();
    }
  }
}
