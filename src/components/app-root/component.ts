import { IAppState, events } from '@state/app-state';
import { getAppStateInstance } from '@state/gat-app-state';

/**
 * Application root
 * 
 * @element app-root
 */
export class AppRoot extends HTMLElement {
  /**
   * Application state instance
   */
  private appState: IAppState;

  constructor() {
    super();

    this.appState = getAppStateInstance();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.appState.eventEmitter.on(events.loaded, this.handleLoadedCallback);

    this.renderLoadingScreen();
    this.appState.startGame();
  }

  disconnectedCallback() {
    this.appState.eventEmitter.off(events.loaded, this.handleLoadedCallback);
  }

  /**
   * Clears screen
   */
  private clearScreen = () => {
    for (const child of this.shadowRoot!.children) {
      child.remove();
    }
  }

  /**
   * Renders loading screen
   */
  private renderLoadingScreen = () => {
    this.clearScreen();

    const loadingScreen = document.createElement('loading-screen');
    this.shadowRoot!.appendChild(loadingScreen);
  };

  /**
   * Handles loaded event and renders game screen
   */
  private handleLoadedCallback = () => {
    this.clearScreen();

    const gameScreen = document.createElement('game-screen');
    this.shadowRoot!.appendChild(gameScreen);
  }
}

customElements.define(
  'app-root',
  AppRoot,
);
