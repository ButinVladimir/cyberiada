import { expect, describe, it, vi } from 'vitest';
import { EventBatcher } from '../event-batcher';

describe('Event batcher', () => {
  const usedEventType = Symbol('used-event-type');
  const unusedEventType = Symbol('unused-event-type');

  it('fires an event', () => {
    const eventBatcher = new EventBatcher();
    const listener = vi.fn();
    eventBatcher.addListener(usedEventType, listener);

    eventBatcher.enqueueEvent(usedEventType);

    eventBatcher.fireEvents();

    expect(listener).toBeCalled();
  });

  it('does not fire an event after adding event listener for different event type', () => {
    const eventBatcher = new EventBatcher();
    const listener = vi.fn();
    eventBatcher.addListener(unusedEventType, listener);

    eventBatcher.enqueueEvent(usedEventType);

    eventBatcher.fireEvents();

    expect(listener).not.toBeCalled();
  });

  it('does not fire an event after removing event listener', () => {
    const eventBatcher = new EventBatcher();
    const listener = vi.fn();
    eventBatcher.addListener(usedEventType, listener);
    eventBatcher.removeListener(usedEventType, listener);

    eventBatcher.enqueueEvent(usedEventType);

    eventBatcher.fireEvents();

    expect(listener).not.toBeCalled();
  });
});
