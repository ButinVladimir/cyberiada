import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { ICompanyState } from '@state/company-state/interfaces/company-state';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { ICloneFactory, IClone, IMakeCloneParameters, IBaseCloneParameters } from './interfaces';
import { Clone } from './clone';

const { lazyInject } = decorators;

@injectable()
export class CloneFactory implements ICloneFactory {
  @lazyInject(TYPES.CompanyState)
  private _companyState!: ICompanyState;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  makeClone(parameters: IMakeCloneParameters): IClone {
    const cloneParameters: IBaseCloneParameters = {
      ...parameters,
      companyState: this._companyState,
      stateUiConnector: this._stateUiConnector,
    };

    const clone = new Clone(cloneParameters);

    return clone;
  }
}
