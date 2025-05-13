import { inject, injectable } from 'inversify';
import { msg } from '@lit/localize';
import type { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { ICityState } from '@state/city-state/interfaces/city-state';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IAutomationState } from '@state/automation-state/interfaces/automation-state';
import type { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import type { ICompanyState } from '@state/company-state/interfaces/company-state';
import { GameSpeed } from '@state/global-state/types';
import { TYPES } from '@state/types';
import { NotificationType } from '@shared/types';
import { CURRENT_VERSION } from '@shared/constants';
import { IAppState, ISerializedState } from './interfaces';
import { Migrator } from './migrator';

@injectable()
export class AppState implements IAppState {
  private _notificationsState: INotificationsState;
  private _globalState: IGlobalState;
  private _growthState: IGrowthState;
  private _settingsState: ISettingsState;
  private _cityState: ICityState;
  private _mainframeState: IMainframeState;
  private _automationState: IAutomationState;
  private _companyState: ICompanyState;

  constructor(
    @inject(TYPES.NotificationsState) _notificationsState: INotificationsState,
    @inject(TYPES.GlobalState) _globalState: IGlobalState,
    @inject(TYPES.GrowthState) _growthState: IGrowthState,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
    @inject(TYPES.CityState) _cityState: ICityState,
    @inject(TYPES.MainframeState) _mainframeState: IMainframeState,
    @inject(TYPES.AutomationState)
    _automationState: IAutomationState,
    @inject(TYPES.CompanyState) _companyState: ICompanyState,
  ) {
    this._notificationsState = _notificationsState;
    this._globalState = _globalState;
    this._growthState = _growthState;
    this._settingsState = _settingsState;
    this._cityState = _cityState;
    this._mainframeState = _mainframeState;
    this._automationState = _automationState;
    this._companyState = _companyState;
  }

  updateState() {
    if (this._globalState.gameSpeed === GameSpeed.paused) {
      this._globalState.time.updateAccumulatedTime(false);
    } else {
      this._globalState.time.updateActiveTime();
    }

    let maxUpdates = Math.floor(this._globalState.time.activeTime / this._settingsState.updateInterval);

    switch (this._globalState.gameSpeed) {
      case GameSpeed.paused:
        maxUpdates = 0;
        break;
      case GameSpeed.normal:
        break;
      case GameSpeed.fast:
        maxUpdates *= this._settingsState.fastSpeedMultiplier;
        break;
    }

    maxUpdates = Math.min(maxUpdates, this._settingsState.maxUpdatesPerTick);

    this.processTicks(maxUpdates);
  }

  fastForwardState(): boolean {
    this._globalState.time.updateActiveTime();

    const maxUpdates = this._settingsState.maxUpdatesPerTick;

    const ticksProcessed = this.processTicks(maxUpdates);

    return ticksProcessed === maxUpdates;
  }

  async startNewState(): Promise<void> {
    await this._settingsState.startNewState();
    await this._globalState.startNewState();
    await this._cityState.startNewState();
    await this._mainframeState.startNewState();
    await this._automationState.startNewState();
    await this._companyState.startNewState();

    this._globalState.recalculate();
    this._growthState.recalculateGrowth();
    this._growthState.resetValues();
  }

  serialize(): ISerializedState {
    const saveState: ISerializedState = {
      gameVersion: CURRENT_VERSION,
      global: this._globalState.serialize(),
      settings: this._settingsState.serialize(),
      city: this._cityState.serialize(),
      mainframe: this._mainframeState.serialize(),
      automation: this._automationState.serialize(),
      company: this._companyState.serialize(),
    };

    return saveState;
  }

  async deserialize(saveData: ISerializedState): Promise<void> {
    const migrator = new Migrator();
    const migratedSaveData = migrator.migrate(saveData);

    if (migrator.hasMigrated) {
      this._notificationsState.pushNotification(
        NotificationType.gameVersionUpdated,
        msg('Game version has been updated'),
        true,
      );
    }

    if (!migratedSaveData) {
      await this.startNewState();
      return;
    }

    await this._settingsState.deserialize(migratedSaveData.settings);
    await this._globalState.deserialize(migratedSaveData.global);
    await this._cityState.deserialize(migratedSaveData.city);
    await this._mainframeState.deserialize(migratedSaveData.mainframe);
    await this._automationState.deserialize(migratedSaveData.automation);
    await this._companyState.deserialize(migratedSaveData.company);

    this._globalState.recalculate();
    this._growthState.recalculateGrowth();
    this._growthState.resetValues();
  }

  private processTicks(maxUpdates: number): number {
    let ticksProcessed = 0;

    for (; ticksProcessed < maxUpdates && this._globalState.time.checkTimeForNextTick(); ticksProcessed++) {
      this.processSingleTick();
    }

    this._growthState.resetValues();

    return ticksProcessed;
  }

  private processSingleTick = () => {
    this._mainframeState.processes.processTick();
    this._companyState.processTick();
    this._globalState.makeNextTick();
    this._cityState.recalculate();
    this._globalState.recalculate();
    this._growthState.recalculateGrowth();
  };
}
