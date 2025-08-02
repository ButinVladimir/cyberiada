import { GAME_ALERT_GROUP_LIST, GAME_ALERT_GROUPS, GameAlert, GameAlertGroup } from '@shared/index';
import { ISettingsGameAlerts } from './interfaces';
import { SettingsGameAlertsSerializedState } from './serialized-states';

export class SettingsGameAlerts implements ISettingsGameAlerts {
  private _enabledAlerts: Set<GameAlert>;

  constructor() {
    this._enabledAlerts = new Set<GameAlert>();
  }

  isAlertEnabled(event: GameAlert): boolean {
    return this._enabledAlerts.has(event);
  }

  checkGroupHasEnabledAlerts(group: GameAlertGroup): boolean {
    return GAME_ALERT_GROUPS[group].some((alert) => this.isAlertEnabled(alert));
  }

  checkSomeAlertsEnabled(): boolean {
    return GAME_ALERT_GROUP_LIST.some((group) => this.checkGroupHasEnabledAlerts(group));
  }

  toggleAlert(alert: GameAlert, enabled: boolean): void {
    if (enabled) {
      this._enabledAlerts.add(alert);
    } else {
      this._enabledAlerts.delete(alert);
    }
  }

  toggleGroup(group: GameAlertGroup, enabled: boolean): void {
    GAME_ALERT_GROUPS[group].forEach((alert) => {
      this.toggleAlert(alert, enabled);
    });
  }

  toggleAllAlerts(enabled: boolean): void {
    GAME_ALERT_GROUP_LIST.forEach((group) => {
      this.toggleGroup(group, enabled);
    });
  }

  async startNewState(): Promise<void> {
    this._enabledAlerts.clear();
    this.toggleAllAlerts(true);
  }

  async deserialize(serializedState: SettingsGameAlertsSerializedState): Promise<void> {
    this._enabledAlerts.clear();
    serializedState.forEach((event) => {
      this.toggleAlert(event, true);
    });
  }

  serialize(): SettingsGameAlertsSerializedState {
    return Array.from(this._enabledAlerts.values());
  }
}
