import { LitElement } from 'lit';
import { IUIEventListener } from './interfaces';

export abstract class BaseComponent<C extends IUIEventListener | undefined = undefined> extends LitElement {
  protected controller?: C;

  performUpdate() {
    this.controller?.startRendering();
    super.performUpdate();
    this.controller?.stopRendering();
  }
}
