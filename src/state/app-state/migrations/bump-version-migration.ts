import { GameVersion } from '@shared/types';
import { IMigration } from '../interfaces';

export class BumpVersionMigration implements IMigration {
  private _gameVersion: GameVersion;

  constructor(gameVersion: GameVersion) {
    this._gameVersion = gameVersion;
  }

  migrate(parsedSaveData: any): any {
    return {
      ...parsedSaveData,
      gameVersion: this._gameVersion,
    };
  }
}
