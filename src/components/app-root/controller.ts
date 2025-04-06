import { BaseController } from '@shared/base-controller';
import { AppStage } from '@state/app/types';

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
}
