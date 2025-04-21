import { ICloneNameGeneratorResult } from '@/workers/clone-name-generator/interfaces';
import { BaseController } from '@shared/base-controller';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';

export class PurchaseCloneDialogController extends BaseController {
  get developmentLevel(): number {
    return this.globalState.development.level;
  }

  getHighestAvailableQuality(cloneTemplateName: CloneTemplateName): number {
    return this.globalState.availableItems.cloneTemplates.getItemHighestAvailableQuality(cloneTemplateName);
  }

  listAvailableCloneTemplates(): CloneTemplateName[] {
    return this.globalState.availableItems.cloneTemplates.listAvailableItems();
  }

  purchaseClone(name: string, templateName: CloneTemplateName, quality: number, level: number): boolean {
    return this.companyState.clones.purchaseClone(name, templateName, quality, level);
  }

  generateName(): Promise<string> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('@workers/clone-name-generator/index.js', import.meta.url), { type: 'module' });

      worker.addEventListener('message', (event: MessageEvent<ICloneNameGeneratorResult>) => {
        this.globalState.setRandomShift(event.data.randomShift);

        resolve(event.data.name);
      });

      worker.addEventListener('error', (event: ErrorEvent) => {
        reject(event.error);
      });

      worker.addEventListener('messageerror', () => {
        reject('Unable to parse clone name generator message');
      });

      worker.postMessage(this.globalState.randomSeed);
    });
  }
}
