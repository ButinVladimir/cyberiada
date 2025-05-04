import { classMap } from 'lit/directives/class-map.js';

export function highlightValue(valid: boolean) {
  return classMap({
    success: valid,
    danger: !valid,
  });
}

export function highlightDifference(diff: number) {
  return classMap({
    success: diff > 0,
    danger: diff < 0,
  });
}
