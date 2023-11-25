import { stateContext } from '@/contexts';
import MainPage from '@components/MainPage';
import { GameStateManager } from '@state/gameStateManager';
import i18n from 'i18next'
import resources from 'virtual:i18next-loader'

const gameStateManager = new GameStateManager();

await i18n.init({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  resources,
  fallbackLng: 'en-US',
  debug: true,
});

function App() {
  return (
    <stateContext.Provider value={gameStateManager}>
      <MainPage />
    </stateContext.Provider>
  );
}

export default App;
