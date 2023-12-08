import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from 'virtual:i18next-loader'
import { stateContext } from '@/contexts';
import MainPage from '@components/MainPage';
import { GameStateManager } from '@state/gameStateManager';
import { DEFAULT_LANGUAGE } from '@state/common'; 

const gameStateManager = new GameStateManager();

await i18n
  .use(initReactI18next)
  .init({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
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
