import { stateContext } from '@/contexts';
import MainPage from '@components/MainPage';
import { GameStateManager } from '@state/gameStateManager';

const gameStateManager = new GameStateManager();

function App() {
  return (
    <stateContext.Provider value={gameStateManager}>
      <MainPage />
    </stateContext.Provider>
  );
}

export default App;
