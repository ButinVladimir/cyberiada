import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { ICloneFactory, IClone, IMakeCloneParameters, IBaseCloneParameters } from './interfaces';
import { Clone } from './clone';

const { lazyInject } = decorators;

@injectable()
export class ProgramFactory implements ICloneFactory {
  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  makeClone(parameters: IMakeCloneParameters): IClone {
    const cloneParameters: IBaseCloneParameters = {
      ...parameters,
      stateUiConnector: this._stateUiConnector,
    };

    const clone = new Clone(cloneParameters);

    return clone;
  }
}
