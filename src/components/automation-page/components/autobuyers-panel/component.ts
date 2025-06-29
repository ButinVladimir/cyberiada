import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent, Feature } from '@shared/index';
import { AutomationAutobuyersPanelController } from './controller';
import styles from './styles';

@customElement('ca-automation-autobuyers-panel')
export class AutomationAutobuyersPanel extends BaseComponent {
  static styles = styles;

  private _controller: AutomationAutobuyersPanelController;

  constructor() {
    super();

    this._controller = new AutomationAutobuyersPanelController(this);
  }

  protected renderDesktop() {
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
