import { IClone } from '@state/company-state/states/clone-factory/interfaces/clone';
import { BaseController } from '@shared/base-controller';
import { ICloneNameGeneratorResult } from '@workers/clone-name-generator/interfaces';

export class RenameCloneDialogController extends BaseController {
  private _clone?: IClone;

  getCloneById(id: string): IClone | undefined {
    if (this._clone?.id !== id) {
      if (this._clone) {
        this.removeEventListenersByEmitter(this._clone);
      }

      this._clone = this.companyState.clones.getCloneById(id);
    }

    return this._clone;
  }

  renameCloneById(id: string, newName: string) {
    const clone = this.companyState.clones.getCloneById(id);

    if (clone) {
      clone.name = newName;
    }
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
