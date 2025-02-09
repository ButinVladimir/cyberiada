import 'reflect-metadata';
import i18n from 'i18next';
import resources from 'virtual:i18next-loader';
import '@components';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
import '@state/bindings';
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import './index.css';

setBasePath('/cyberiada/shoelace');

window.i18next = i18n;

i18n
  .init({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
  })
  .then(() => {
    const appRootElement = document.createElement('ca-app-root');
    document.getElementById('root')!.append(appRootElement);
  })
  .catch((e) => {
    console.error(e);
  });
