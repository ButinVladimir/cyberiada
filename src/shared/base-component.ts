import { LitElement, PropertyValues } from 'lit';
import { IStateUIConnector } from '@state/state-ui-connector';
import { container } from '@state/container';
import { TYPES } from '@state/types';

export abstract class BaseComponent extends LitElement {
  public readonly hasPartialUpdate: boolean = false;

  private _stateUIConnector: IStateUIConnector = container.get<IStateUIConnector>(TYPES.StateUIConnector);

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    if (this.hasPartialUpdate && this.isConnected) {
      this.handlePartialUpdate();
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this._stateUIConnector.connectComponent(this);
    this.requestUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._stateUIConnector.disconnectComponent(this);
  }

  performUpdate() {
    if (this.isConnected) {
      this._stateUIConnector.startRendering(this);
    }

    super.performUpdate();

    if (this.isConnected) {
      this._stateUIConnector.stopRendering();
    }
  }

  handlePartialUpdate = () => {};
}
