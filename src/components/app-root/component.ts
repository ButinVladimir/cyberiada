import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AppStage } from '@state/app/types';
import { BaseComponent } from '@shared/base-component';
import { AppRootController } from './controller';

@customElement('ca-app-root')
export class AppRoot extends BaseComponent<AppRootController> {
  protected controller: AppRootController;

  constructor() {
    super();

    this.controller = new AppRootController(this);
  }

  render() {
    switch (this.controller.appStage) {
      case AppStage.loading:
        return html`<ca-loading-screen></ca-loading-screen>`;

      case AppStage.running:
        return html`<ca-game-screen></ca-game-screen>`;

      case AppStage.fastForward:
        return html`<ca-fast-forwarding-screen></ca-fast-forwarding-screen>`;

      default:
        return nothing;
    }
  }
}
