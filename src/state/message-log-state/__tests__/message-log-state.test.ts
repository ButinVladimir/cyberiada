import 'reflect-metadata';
import { expect, describe, it, vi, beforeAll, beforeEach, afterEach } from 'vitest';
import { IMessageLogState } from '../interfaces/message-log-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { container } from '@state/container';
import { TYPES } from '@state/types';
import { GameStateEvent } from '@shared/types';
import '@state/bindings';
import { MESSAGE_LOG_UI_EVENTS } from '../constants';

describe('Message log state', () => {
  const maxMessageLogSize = 3;
  let messageLogState: IMessageLogState;
  let settingsState: ISettingsState;
  let listener: (...args: any[]) => void;

  beforeAll(() => {
    messageLogState = container.get(TYPES.MessageLogState);
    settingsState = container.get(TYPES.SettingsState);
  });

  beforeEach(() => {
    messageLogState.clearMessages();

    listener = vi.fn();
    messageLogState.addUiEventListener(MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES, listener);

    settingsState.toggleMessageEvent(GameStateEvent.gameStarted, true);
    settingsState.setMessageLogSize(maxMessageLogSize);
  });

  afterEach(() => {
    messageLogState.removeUiEventListener(MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES, listener);
  });

  it('posts message when event is enabled', () => {
    const messageParameters = { parameter: 'value' };
    messageLogState.postMessage(GameStateEvent.gameStarted, messageParameters);

    const messages = messageLogState.getMessages();
    expect(messages).toHaveLength(1);
    const { id, date, event, parameters } = messages[0];

    expect(id).toBeTruthy();
    expect(event).toBe(GameStateEvent.gameStarted);
    expect(date).toBeInstanceOf(Date);
    expect(parameters).toBe(messageParameters);
  });

  it('keeps messsage log size after posting a message', () => {
    for (let i = 0; i < 10; i++) {
      messageLogState.postMessage(GameStateEvent.gameStarted, { value: i });
    }

    const messages = messageLogState.getMessages();
    expect(messages).toMatchObject([
      {
        event: GameStateEvent.gameStarted,
        parameters: { value: 7 },
      },
      {
        event: GameStateEvent.gameStarted,
        parameters: { value: 8 },
      },
      {
        event: GameStateEvent.gameStarted,
        parameters: { value: 9 },
      },
    ]);
  });

  it('does not post message when event is disabled', () => {
    settingsState.toggleMessageEvent(GameStateEvent.gameStarted, false);

    const messageParameters = { parameter: 'value' };
    messageLogState.postMessage(GameStateEvent.gameStarted, messageParameters);

    const messages = messageLogState.getMessages();
    expect(messages).toHaveLength(0);
  });

  it('triggers ui update after posting message', () => {
    messageLogState.postMessage(GameStateEvent.gameStarted);

    expect(listener!).toHaveBeenCalled();
  });

  it('triggers ui update after clearing messages', () => {
    messageLogState.clearMessages();

    expect(listener!).toHaveBeenCalled();
  });

  it('does not trigger ui update after removing handler', () => {
    messageLogState.removeUiEventListener(MESSAGE_LOG_UI_EVENTS.UPDATED_MESSAGES, listener);
    messageLogState.clearMessages();

    expect(listener!).not.toHaveBeenCalled();
  });
});
