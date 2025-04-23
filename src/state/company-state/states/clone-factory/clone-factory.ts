import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { ICompanyState } from '@state/company-state/interfaces/company-state';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IFormatter } from '@shared/interfaces/formatter';
import { ICloneFactory, IClone, IMakeCloneParameters, IBaseCloneParameters } from './interfaces';
import { Clone } from './clone';

const { lazyInject } = decorators;

@injectable()
export class CloneFactory implements ICloneFactory {
  @lazyInject(TYPES.CompanyState)
  private _companyState!: ICompanyState;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.MessageLogState)
  private _messageLogState!: IMessageLogState;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  makeClone(parameters: IMakeCloneParameters): IClone {
    const cloneParameters: IBaseCloneParameters = {
      ...parameters,
      companyState: this._companyState,
      globalState: this._globalState,
      messageLogState: this._messageLogState,
      stateUiConnector: this._stateUiConnector,
      formatter: this._formatter,
    };

    const clone = new Clone(cloneParameters);

    return clone;
  }
}
