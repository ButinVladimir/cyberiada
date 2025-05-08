import { classMap } from 'lit/directives/class-map.js';

export function getHighlightValueClassMap(valid: boolean) {
  return classMap({
    success: valid,
    danger: !valid,
  });
}

export function getHighlightDifferenceClassMap(diff: number) {
  return classMap({
    success: diff > 0,
    danger: diff < 0,
  });
}

export function getHighlightValueClass(valid: boolean) {
  return valid ? 'success' : 'danger';
}

export function getHighlightDifferenceClass(difference: number) {
  if (difference > 0) {
    return 'success';
  }

  if (difference < 0) {
    return 'danger';
  }

  return '';
}
