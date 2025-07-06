import { html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import { BaseComponent, UPGRADE_MAX_VALUES } from '@shared/index';
import { ClonesListUpgradeButtonsController } from './controller';
import styles from './styles';

@localized()
@customElement('ca-clones-list-upgrade-buttons')
export class ClonesListUpgradeButtons extends BaseComponent {
  static styles = styles;

  hasPartialUpdate = true;

  private _controller: ClonesListUpgradeButtonsController;

  private _upgradeLevelMaxButton = createRef<SlButton>();

  constructor() {
    super();

    this._controller = new ClonesListUpgradeButtonsController(this);
  }

  protected renderDesktop() {
    return html`
      <sl-button-group>
        <sl-button
          ${ref(this._upgradeLevelMaxButton)}
          disabled
          variant=${UPGRADE_MAX_VALUES.buttonVariant}
          @click=${this.handleUpgradeMaxAllLevels}
        >
          <sl-icon slot="prefix" name=${UPGRADE_MAX_VALUES.icon}></sl-icon>

          ${msg('Upgrade all levels')}
        </sl-button>
      </sl-button-group>
    `;
  }

  private handleUpgradeMaxAllLevels = () => {
    this._controller.upgradeMaxAllLevels();
  };

  handlePartialUpdate = () => {
    if (this._upgradeLevelMaxButton.value) {
      const buttonDisabled = !this._controller.checkCanUpgradeMaxAllLevels();

      this._upgradeLevelMaxButton.value.disabled = buttonDisabled;
    }
  };
}
