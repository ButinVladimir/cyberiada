import { expect, describe, it, vi } from 'vitest';
import { EventBatcher } from '../event-batcher';

describe('Event batcher', () => {
  const usedEventType = 'used-event-type';
  const unusedEventType = 'unused-event-type';
  const args = ['a', 1];

  it('fires an event', () => {
    const eventBatcher = new EventBatcher();
    const listener = vi.fn();
    eventBatcher.addListener(usedEventType, listener);

    eventBatcher.enqueueEvent(usedEventType, ...args);

    eventBatcher.fireEvents();

    expect(listener).toBeCalledWith(...args);
  });

  it('does not fire an event after adding event listener for different event type', () => {
    const eventBatcher = new EventBatcher();
    const listener = vi.fn();
    eventBatcher.addListener(unusedEventType, listener);

    eventBatcher.enqueueEvent(usedEventType, ...args);

    eventBatcher.fireEvents();

    expect(listener).not.toBeCalled();
  });

  it('does not fire an event after removing event listener', () => {
    const eventBatcher = new EventBatcher();
    const listener = vi.fn();
    eventBatcher.addListener(usedEventType, listener);
    eventBatcher.removeListener(usedEventType, listener);

    eventBatcher.enqueueEvent(usedEventType, ...args);

    eventBatcher.fireEvents();

    expect(listener).not.toBeCalled();
  });

  it('fires an event after enqueueing same event twice', () => {
    const eventBatcher = new EventBatcher();
    const listener = vi.fn();
    eventBatcher.addListener(usedEventType, listener);

    eventBatcher.enqueueEvent(usedEventType, ...args);
    const newArgs = ['b', 6, true];
    eventBatcher.enqueueEvent(usedEventType, ...newArgs);

    eventBatcher.fireEvents();

    expect(listener).toBeCalledWith(...newArgs);
  });
});
