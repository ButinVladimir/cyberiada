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

  constructor(
    @inject(TYPES.StateUIConnector) _stateUiConnector: IStateUIConnector,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
  ) {
    this._stateUiConnector = _stateUiConnector;
    this._settingsState = _settingsState;

    this._messages = [];

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  postMessage(event: MessageEvent, parameters?: Record<string, any>) {
    if (!this._settingsState.isMessageEventEnabled(event)) {
      return;
    }

    this._messages.push({
      date: new Date(),
      id: uuid(),
      event,
      parameters,
    });

    const messagesToDelete = this._messages.length - this._settingsState.messageLogSize;
    if (messagesToDelete > 0) {
      this._messages.splice(0, messagesToDelete);
    }

    this.uiEventBatcher.enqueueEvent(MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES);
  }

  getMessages(): IMessage[] {
    this._stateUiConnector.connectEventHandler(this, MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES);

    return this._messages;
  }

  clearMessages() {
    this._messages.splice(0);

    this.uiEventBatcher.enqueueEvent(MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES);
  }
}
