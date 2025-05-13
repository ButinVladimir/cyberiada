export const PARTIAL_UPDATE_UI_EVENT = Symbol('PARTIAL_UPDATE_UI_EVENT');

export const ARRAY_MODIFYING_METHODS = new Set<string | symbol>(['push', 'pop', 'shift', 'unshift', 'slice', 'splice']);

export const MAP_MODIFYING_METHODS = new Set<string | symbol>(['set', 'clear', 'delete']);

export const SET_MODIFYING_METHODS = new Set<string | symbol>(['add', 'clear', 'delete']);
