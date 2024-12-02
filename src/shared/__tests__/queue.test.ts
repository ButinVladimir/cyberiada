import { expect, describe, it } from 'vitest';
import { Queue } from '../queue';

describe('Queue', () => {
  const maxNumber = 3;

  it('returns same value in same order after pushing them', () => {
    const queue = new Queue<number>();

    for (let i = 0; i < maxNumber; i++) {
      queue.push(i);
    }

    const result = [];
    for (let i = 0; i < maxNumber; i++) {
      result.push(queue.pop());
    }

    expect(result).toMatchObject([0, 1, 2]);
  });

  it('is not empty after pushing values', () => {
    const queue = new Queue<number>();

    for (let i = 0; i < maxNumber; i++) {
      queue.push(i);
    }

    expect(queue.isEmpty()).toBe(false);
  });

  it('is empty after popping values', () => {
    const queue = new Queue<number>();

    for (let i = 0; i < maxNumber; i++) {
      queue.push(i);
    }

    for (let i = 0; i < maxNumber; i++) {
      queue.pop();
    }

    expect(queue.isEmpty()).toBe(true);
  });

  it('throws an error when trying to pop an empty queue', () => {
    const queue = new Queue<number>();

    expect(() => {
      queue.pop();
    }).toThrow('Cannot pop element because queue is empty');
  });
});
