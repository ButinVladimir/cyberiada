import templateContentRaw from './template.html?raw';

const template = document.createElement('template');
template.innerHTML = templateContentRaw;

/**
 * Top bar
 * 
 * @element top-bar
 */
export class TopBar extends HTMLElement {
  constructor() {
    super();
    
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const templateContent = template.content.cloneNode(true);
    shadowRoot.appendChild(templateContent);
  }
}

customElements.define(
  'top-bar',
  TopBar,
);
