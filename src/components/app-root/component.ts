import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AppRootController } from './controller';
import { AppStage } from '@state/app/types';

@customElement('ca-app-root')
export class AppRoot extends LitElement {
  private _appRootController: AppRootController;

  constructor() {
    super();

    this._appRootController = new AppRootController(this);
  }

  render() {
    switch (this._appRootController.appStage) {
      case AppStage.loading:
        return html`<ca-loading-screen></ca-loading-screen>`;
      case AppStage.running:
        return html`<ca-game-screen></ca-game-screen>`;
      default:
        return null;
    }
  }
}
