import i18n from 'i18next';
import resources from 'virtual:i18next-loader';
import 'i18next-wc';
import '@components';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';

setBasePath('/shoelace');

window.i18next = i18n;

i18n
  .init({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    resources,
    fallbackLng: 'en',
    debug: true,
  })
  .then(() => {
    const appRootElement = document.createElement('ca-app-root');
    document.getElementById('root')!.append(appRootElement);
  })
  .catch((e) => {
    console.error(e);
  });
