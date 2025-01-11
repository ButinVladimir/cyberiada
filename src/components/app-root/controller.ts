import { AppStage } from '@state/app';
import { BaseController } from '@shared/base-controller';

export class AppRootController extends BaseController {
  hostConnected() {
    super.hostConnected();

    this.app.startUp().catch((e) => {
      console.error(e);
    });
  }

  get appStage(): AppStage {
    return this.app.appStage;
  }

  saveGame() {
    this.app.saveGame();
  }
}
