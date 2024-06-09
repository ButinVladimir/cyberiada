import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AppRootController } from './controller';

@customElement('ca-app-root')
export class AppRoot extends LitElement {
  private _appRootController: AppRootController;

  constructor() {
    super();

    this._appRootController = new AppRootController(this);
  }

  render() {
    if (!this._appRootController.isLoaded) {
      return html`
        <ca-loading-screen></ca-loading-screen>
      `;
    }

    return html`
      <ca-game-screen></ca-game-screen>
    `;
  }
}
