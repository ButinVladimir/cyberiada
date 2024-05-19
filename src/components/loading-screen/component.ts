import templateContentRaw from './template.html?raw';

const template = document.createElement('template');
template.innerHTML = templateContentRaw;

/**
 * Loading screen
 * 
 * @element loading-screen
 */
export class LoadingScreen extends HTMLElement {
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
