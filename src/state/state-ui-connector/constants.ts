export const PARTIAL_UPDATE_UI_EVENT = Symbol('PARTIAL_UPDATE_UI_EVENT');

export const ARRAY_MODIFYING_METHODS = new Set<string | symbol>([
  'push', 'pop', 'shift', 'unshift', 'slice', 'splice',
]);
