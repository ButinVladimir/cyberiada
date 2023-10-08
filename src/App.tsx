import { wrap } from 'comlink';
import { StateTest } from '@components/StateTest';
import { StateContext } from '@components/StateContext';
import { GameStateManager } from '@state/gameStateManager';
import './transfer-handlers';

const workerClass = wrap<typeof GameStateManager>(
  new Worker(new URL('./worker', import.meta.url), {
    type: 'module',
  })
);

const gameStateManager = await new workerClass();

function App() {
  return (
    <StateContext.Provider value={gameStateManager}>
      <StateTest />
    </StateContext.Provider>
  );
}

export default App;
