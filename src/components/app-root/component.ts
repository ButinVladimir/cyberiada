import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AppRootController } from './controller';
import { AppStateValue } from '@/state/general-state';

@customElement('ca-app-root')
export class AppRoot extends LitElement {
  private _appRootController: AppRootController;

  constructor() {
    super();

    this._appRootController = new AppRootController(this);
  }

  render() {
    switch (this._appRootController.gameState) {
      case AppStateValue.loading:
        return html` <ca-loading-screen></ca-loading-screen> `;
      case AppStateValue.running:
        return html` <ca-game-screen></ca-game-screen> `;
      default:
        return null;
    }
  }
}
