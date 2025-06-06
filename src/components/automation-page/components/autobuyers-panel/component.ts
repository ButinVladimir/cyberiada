import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { Feature } from '@shared/types';
import { AutomationAutobuyersPanelController } from './controller';

@customElement('ca-automation-autobuyers-panel')
export class AutomationAutobuyersPanel extends BaseComponent {
  static styles = css`
    :host {
      width: 100%;
      display: flex;
      align-items: stretch;
      flex-direction: column;
      gap: var(--sl-spacing-large);
    }
  `;

  private _controller: AutomationAutobuyersPanelController;

  constructor() {
    super();

    this._controller = new AutomationAutobuyersPanelController(this);
  }

  render() {
    return html`
      ${this._controller.isFeatureUnlocked(Feature.companyManagement)
        ? html`<ca-automation-clone-level-autoupgrader></ca-automation-clone-level-autoupgrader>`
        : nothing}
      ${this._controller.isFeatureUnlocked(Feature.automationMainframeHardware)
        ? html`<ca-automation-mainframe-hardware-autobuyer></ca-automation-mainframe-hardware-autobuyer>`
        : nothing}
      ${this._controller.isFeatureUnlocked(Feature.automationMainframePrograms)
        ? html`<ca-automation-mainframe-programs-autobuyer></ca-automation-mainframe-programs-autobuyer>`
        : nothing}
    `;
  }
}
