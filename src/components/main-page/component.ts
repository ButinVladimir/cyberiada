export class MainPage extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });
    this.renderLoadingScreen();
  }

  clearScreen() {
    for (const child of this.shadowRoot!.children) {
      child.remove();
    }
  }

  renderLoadingScreen() {
    this.clearScreen();

    const loadingScreen = document.createElement('loading-screen');
    this.shadowRoot!.appendChild(loadingScreen);
  }
}

customElements.define(
  'main-page',
  MainPage,
);
