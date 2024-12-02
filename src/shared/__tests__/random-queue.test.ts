import { expect, describe, it } from 'vitest';
import { XORShift128Plus } from 'random-seedable';
import { RandomQueue } from '../random-queue';

describe('Random queue', () => {
  const maxNumber = 3;
  const randomGenerator = new XORShift128Plus(1024, 2048);

  it('returns same value in same order after pushing them', () => {
    const queue = new RandomQueue<number>(randomGenerator);

    for (let i = 0; i < maxNumber; i++) {
      queue.push(i);
    }

    const result = [];
    for (let i = 0; i < maxNumber; i++) {
      result.push(queue.pop());
    }

    for (let i = 0; i < maxNumber; i++) {
      expect(result).toContain(i);
    }
  });

  it('is not empty after pushing values', () => {
    const queue = new RandomQueue<number>(randomGenerator);

    for (let i = 0; i < maxNumber; i++) {
      queue.push(i);
    }

    expect(queue.isEmpty()).toBe(false);
  });

  it('is empty after popping values', () => {
    const queue = new RandomQueue<number>(randomGenerator);

    for (let i = 0; i < maxNumber; i++) {
      queue.push(i);
    }

    for (let i = 0; i < maxNumber; i++) {
      queue.pop();
    }

    expect(queue.isEmpty()).toBe(true);
  });

  it('throws an error when trying to pop an empty queue', () => {
    const queue = new RandomQueue<number>(randomGenerator);

    expect(() => {
      queue.pop();
    }).toThrow('Cannot pop element because queue is empty');
  });
});
