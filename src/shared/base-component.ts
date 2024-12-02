import { LitElement } from 'lit';
import { IUIEventListener } from './interfaces';

export abstract class BaseComponent<C extends IUIEventListener | undefined = undefined> extends LitElement {
  protected controller?: C;

  render() {
    this.controller?.startRendering();

    return this.renderContent();
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    this.controller?.stopRendering();
  }

  abstract renderContent(): unknown;
}
