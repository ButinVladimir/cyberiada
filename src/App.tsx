import { wrap } from 'comlink';
import { StateContext } from '@/contexts';
import MainPage from '@components/MainPage';
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
      <MainPage />
    </StateContext.Provider>
  );
}

export default App;
