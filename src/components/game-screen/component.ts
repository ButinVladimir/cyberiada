import templateContentRaw from './template.html?raw';

const template = document.createElement('template');
template.innerHTML = templateContentRaw;

/**
 * Game screen
 * 
 * @element game-screen
 */
export class GameScreen extends HTMLElement {
  constructor() {
    super();
    
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const templateContent = template.content.cloneNode(true);
    shadowRoot.appendChild(templateContent);
  }
}

customElements.define(
  'game-screen',
  GameScreen,
);
