import { inject, injectable } from 'inversify';
import { v4 as uuid } from 'uuid';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { TYPES } from '@state/types';
import { IMessageLogState, IMessage } from './interfaces';
import { MESSAGE_LOG_UI_EVENTS } from './constants';
import { MessageEvent } from '@shared/types';

@injectable()
export class MessageLogState implements IMessageLogState {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;
  private _settingsState: ISettingsState;
  private readonly _messages: IMessage[];
  private readonly _toasts: IMessage[];

  constructor(
    @inject(TYPES.StateUIConnector) _stateUiConnector: IStateUIConnector,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
  ) {
    this._stateUiConnector = _stateUiConnector;
    this._settingsState = _settingsState;

    this._messages = [];
    this._toasts = [];

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  postMessage(event: MessageEvent, parameters?: Record<string, any>, postToast = true) {
    if (!this._settingsState.isMessageEventEnabled(event)) {
      return;
    }

    const message: IMessage = {
      date: new Date(),
      id: uuid(),
      event,
      parameters,
    };

    this._messages.push(message);

    while (this._messages.length > this._settingsState.messageLogSize) {
      this._messages.shift();
    }

    this.uiEventBatcher.enqueueEvent(MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES);

    if (postToast && this._settingsState.toastDuration > 0) {
      this._toasts.push(message);

      while (this._toasts.length > this._settingsState.messageLogSize) {
        this._toasts.shift();
      }

      this.uiEventBatcher.enqueueEvent(MESSAGE_LOG_UI_EVENTS.UPDATED_TOASTS);
    }
  }

  getMessages(): IMessage[] {
    this._stateUiConnector.connectEventHandler(this, MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES);

    return this._messages;
  }

  clearMessages() {
    this._messages.length = 0;

    this.uiEventBatcher.enqueueEvent(MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES);
  }

  getToasts(): IMessage[] {
    this._stateUiConnector.connectEventHandler(this, MESSAGE_LOG_UI_EVENTS.UPDATED_TOASTS);

    const toastsBatch = this._toasts.splice(0);

    return toastsBatch;
  }
}
