import { injectable } from 'inversify';
import { v4 as uuid } from 'uuid';
import { msg, str } from '@lit/localize';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { decorators } from '@state/container';
import { MessageEvent } from '@shared/types';
import { IMessageLogState, IMessage } from './interfaces';

const { lazyInject } = decorators;

@injectable()
export class MessageLogState implements IMessageLogState {
  private UI_EVENTS = {
    UPDATED_MESSAGES: Symbol('UPDATED_MESSAGES'),
    UPDATED_TOASTS: Symbol('UPDATED_TOASTS'),
  };

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.SettingsState)
  private _settingsState!: ISettingsState;

  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  private readonly _messages: IMessage[];
  private readonly _toasts: IMessage[];

  constructor() {
    this._messages = [];
    this._toasts = [];

    this._stateUiConnector.registerEvents(this.UI_EVENTS);
  }

  postMessage(event: MessageEvent, messageText: string, postToast = true) {
    if (!this._settingsState.isMessageEventEnabled(event)) {
      return;
    }

    const messageDate = new Date();
    const formattedTime = this._formatter.formatDateTime(messageDate);
    this._messages.push({
      id: uuid(),
      event,
      messageText: msg(str`[${formattedTime}] ${messageText}`),
    });

    while (this._messages.length > this._settingsState.messageLogSize) {
      this._messages.shift();
    }

    this._stateUiConnector.enqueueEvent(this.UI_EVENTS.UPDATED_MESSAGES);

    if (postToast && this._settingsState.toastDuration > 0) {
      this._toasts.push({
        id: uuid(),
        event,
        messageText: messageText,
      });

      while (this._toasts.length > this._settingsState.messageLogSize) {
        this._toasts.shift();
      }

      this._stateUiConnector.enqueueEvent(this.UI_EVENTS.UPDATED_TOASTS);
    }
  }

  getMessages(): IMessage[] {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.UPDATED_MESSAGES);

    return this._messages;
  }

  clearMessages() {
    this._messages.length = 0;

    this._stateUiConnector.enqueueEvent(this.UI_EVENTS.UPDATED_MESSAGES);
  }

  getToasts(): IMessage[] {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.UPDATED_TOASTS);

    const toastsBatch = this._toasts.splice(0);

    return toastsBatch;
  }
}
