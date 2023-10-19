import { StateContext } from '@/contexts';
import MainPage from '@components/MainPage';
import { GameStateManager } from '@state/gameStateManager';

const gameStateManager = new GameStateManager();

function App() {
  return (
    <StateContext.Provider value={gameStateManager}>
      <MainPage />
    </StateContext.Provider>
  );
}

export default App;
