import { inject, injectable } from 'inversify';
import { v4 as uuid } from 'uuid';
import { EventBatcher } from '@shared/event-batcher';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { TYPES } from '@state/types';
import { IMessageLogState, IMessage } from './interfaces';
import { MESSAGE_LOG_UI_EVENTS } from './constants';
import { GameStateEvent } from '@shared/types';

@injectable()
export class MessageLogState implements IMessageLogState {
  private _settingsState: ISettingsState;
  private readonly _messages: IMessage[];
  private readonly _uiEventBatcher: EventBatcher;

  constructor(@inject(TYPES.SettingsState) _settingsState: ISettingsState) {
    this._settingsState = _settingsState;

    this._messages = [];

    this._uiEventBatcher = new EventBatcher();
  }

  postMessage(event: GameStateEvent, parameters?: Record<string, any>) {
    if (!this._settingsState.isMessageFilterEventEnabled(event)) {
      return;
    }

    this._messages.push({
      date: new Date(),
      id: uuid(),
      event,
      parameters,
    });

    this._uiEventBatcher.enqueueEvent(MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES);
    this._uiEventBatcher.fireEvents();
  }

  getMessages(): IMessage[] {
    return this._messages;
  }

  clearMessages() {
    this._messages.splice(0);

    this._uiEventBatcher.enqueueEvent(MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES);
    this._uiEventBatcher.fireEvents();
  }

  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.removeListener(eventName, handler);
  }
}
