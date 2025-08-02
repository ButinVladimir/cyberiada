import { MESSAGE_EVENT_GROUP_LIST, MESSAGE_EVENT_GROUPS, MessageEvent, MessageEventGroup } from '@shared/index';
import { ISettingsMessageEvents } from './interfaces';
import { SettingsMessageEventsSerializedState } from './serialized-states';

export class SettingsMessageEvents implements ISettingsMessageEvents {
  private _enabledMessageEvents: Set<MessageEvent>;

  constructor() {
    this._enabledMessageEvents = new Set<MessageEvent>();
  }

  isEventEnabled(event: MessageEvent): boolean {
    return this._enabledMessageEvents.has(event);
  }

  checkGroupHasEnabledEvents(group: MessageEventGroup): boolean {
    return MESSAGE_EVENT_GROUPS[group].some((event) => this.isEventEnabled(event));
  }

  checkSomeEventsEnabled(): boolean {
    return MESSAGE_EVENT_GROUP_LIST.some((group) => this.checkGroupHasEnabledEvents(group));
  }

  toggleEvent(event: MessageEvent, enabled: boolean): void {
    if (enabled) {
      this._enabledMessageEvents.add(event);
    } else {
      this._enabledMessageEvents.delete(event);
    }
  }

  toggleGroup(group: MessageEventGroup, enabled: boolean): void {
    MESSAGE_EVENT_GROUPS[group].forEach((event) => {
      this.toggleEvent(event, enabled);
    });
  }

  toggleAllEvents(enabled: boolean): void {
    MESSAGE_EVENT_GROUP_LIST.forEach((group) => {
      this.toggleGroup(group, enabled);
    });
  }

  async startNewState(): Promise<void> {
    this._enabledMessageEvents.clear();
    this.toggleAllEvents(true);
  }

  async deserialize(serializedState: SettingsMessageEventsSerializedState): Promise<void> {
    this._enabledMessageEvents.clear();
    serializedState.forEach((event) => {
      this.toggleEvent(event, true);
    });
  }

  serialize(): SettingsMessageEventsSerializedState {
    return Array.from(this._enabledMessageEvents.values());
  }
}
