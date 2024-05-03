import { withTwind } from '@components/with-twind';
import templateContentRaw from './templates/loading-screen.html?raw';

const template = document.createElement('template');
template.innerHTML = templateContentRaw;

export class LoadingScreen extends withTwind(HTMLElement) {
  constructor() {
    super();
    
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const templateContent = template.content.cloneNode(true);
    shadowRoot.appendChild(templateContent);
  }
}

customElements.define(
  'loading-screen',
  LoadingScreen,
);
