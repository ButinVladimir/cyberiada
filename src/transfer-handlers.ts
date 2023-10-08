import { transferHandlers, TransferHandler } from 'comlink';
import { GlobalState, ISerializedGlobalState } from '@state/gameState';

transferHandlers.set('globalState', {
  // eslint-disable-next-line
  canHandle(obj: any) {
    return obj && obj instanceof GlobalState;
  },
  serialize(obj: GlobalState) {
    const result = [
      obj.serialize(),
      [],
    ];

    return result;
  },
  deserialize(obj: ISerializedGlobalState) {
    const result = GlobalState.deserialize(obj);

    return result;
  },
// eslint-disable-next-line
} as any as TransferHandler<unknown, unknown>);
