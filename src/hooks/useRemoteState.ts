import React from 'react';
import { proxy } from 'comlink';
import { StateContext } from '@/contexts/';
import { Events } from '@state/common';
import { IGameStateManager } from '@/state/gameStateManager';

type StateName = keyof IGameStateManager;

const eventMap: Record<string, Events> = {
  globalState: Events.GlobalStateUpdated,
};

export function useRemoteState<T>(stateKey: StateName): T | null {
  const event = eventMap[stateKey];
  const gameStateManager = React.useContext(StateContext);
  const [state, setState] = React.useState<T | null>(null);

  React.useEffect(() => {
    if (!gameStateManager) {
      return;
    }

    (gameStateManager[stateKey] as Promise<T>).then((newState: T) => {
      setState(newState);
    }, (error: Error) => {
      console.error(error);
    });

    const globalStateUpdatedCb = proxy(async () => {
      setState(await (gameStateManager[stateKey] as Promise<T>));
    });

    gameStateManager.on(event, globalStateUpdatedCb);

    return () => {
      gameStateManager.off(event, globalStateUpdatedCb);
    };
  }, [gameStateManager, stateKey, event]);

  return state;
}