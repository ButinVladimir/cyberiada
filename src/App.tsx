import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from 'virtual:i18next-loader'
import MainPage from '@components/MainPage';
import { getGameStateManagerInstance, initTestData } from '@state/gameStateManager';
import { DEFAULT_LANGUAGE } from '@state/common'; 

getGameStateManagerInstance();
initTestData();

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
    <MainPage />
  );
}

export default App;
