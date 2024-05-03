import i18n from 'i18next';
import resources from 'virtual:i18next-loader';
import 'i18next-wc'
import '@components';

// eslint-disable-next-line
window.i18next = i18n;

await i18n
  .init({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    resources,
    fallbackLng: 'en-US',
    debug: true,
  });

const mainPageElement = document.createElement('main-page');
document.getElementById('root')!.append(mainPageElement);
