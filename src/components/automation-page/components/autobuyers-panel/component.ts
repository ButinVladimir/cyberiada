import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { Feature } from '@shared/types';
import { AutomationAutobuyersPanelController } from './controller';

@customElement('ca-automation-autobuyers-panel')
export class AutomationAutobuyersPanel extends BaseComponent<AutomationAutobuyersPanelController> {
  static styles = css`
    :host {
      width: 100%;
      display: flex;
      align-items: stretch;
      flex-direction: column;
      gap: var(--sl-spacing-large);
    }
  `;

  protected controller: AutomationAutobuyersPanelController;

  constructor() {
    super();

    this.controller = new AutomationAutobuyersPanelController(this);
  }

  render() {
    return html`
      ${this.controller.isFeatureUnlocked(Feature.automationMainframeHardware)
        ? html`<ca-automation-mainframe-hardware-autobuyer></ca-automation-mainframe-hardware-autobuyer>`
        : nothing}
      ${this.controller.isFeatureUnlocked(Feature.automationMainframePrograms)
        ? html`<ca-automation-mainframe-programs-autobuyer></ca-automation-mainframe-programs-autobuyer>`
        : nothing}
    `;
  }
}
