import React, { useEffect } from 'react';
import { proxy } from 'comlink';
import { StateContext } from '@components/StateContext'
import { GlobalState } from '@/state/gameState';
import { Events } from '@state/common';

export function StateTest() {
  const gameStateManager = React.useContext(StateContext);
  const [newSpeed, setNewSpeed] = React.useState<number>(0);
  const [globalState, setGlobalState] = React.useState<GlobalState | null>(null);

  useEffect(() => {
    if (!gameStateManager) {
      return;
    }

    gameStateManager.globalState.then(newGlobalState => {
      setGlobalState(newGlobalState);
    }, error => {
      console.error(error);
    });

    const globalStateUpdatedCb = proxy(async () => {
      setGlobalState(await gameStateManager.globalState);
    });

    gameStateManager.on(Events.GlobalStateUpdated, globalStateUpdatedCb);

    return () => {
      gameStateManager.off(Events.GlobalStateUpdated, globalStateUpdatedCb);
    };
  }, [gameStateManager]);

  if (!globalState) {
    return null;
  }

  const handleNewSpeedChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewSpeed(+event.target.value || 0);
  };

  const handleApply = () => {
    gameStateManager?.changeSpeed(newSpeed)
      .then(() => gameStateManager?.globalState)
      .then(newGlobalState => setGlobalState(newGlobalState));
  };

  return (
    <>
      <div>Speed: {globalState.speed}, time: {globalState.time}</div>
      <div>
        <input type="number" value={newSpeed} onChange={handleNewSpeedChange} />
        <button onClick={handleApply}>Apply changes</button>
      </div>
    </>
  );
}
