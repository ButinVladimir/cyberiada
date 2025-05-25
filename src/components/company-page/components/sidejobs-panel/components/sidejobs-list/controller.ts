import { ISidejob } from '@/state/company-state';
import { BaseController } from '@shared/base-controller';

export class SidejobsListController extends BaseController {
  listSidejobs(): ISidejob[] {
    return this.companyState.sidejobs.listSidejobs();
  }

  cancelAllSidejobs(): void {
    this.companyState.sidejobs.cancelAllSidejobs();
  }
}
