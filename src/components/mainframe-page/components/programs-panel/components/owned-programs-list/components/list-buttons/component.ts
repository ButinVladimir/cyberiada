import { css, html } from 'lit';
import { localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import { BaseComponent, AUTOUPGRADE_VALUES, SCREEN_WIDTH_POINTS, UPGRADE_MAX_VALUES } from '@shared/index';
import { COMMON_TEXTS } from '@texts/common';
import { OwnedProgramsListButtonsController } from './controller';

@localized()
@customElement('ca-owned-programs-list-buttons')
export class OwnedProgramsListButtons extends BaseComponent {
  static styles = css`
    :host {
      display: contents;
    }

    .buttons {
      align-items: center;
      flex-direction: row;
      gap: var(--sl-spacing-small);
    }

    .buttons.desktop {
      display: none;
      justify-content: flex-end;
      font-size: var(--sl-font-size-large);
    }

    .buttons.mobile {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
      .buttons.desktop {
        display: flex;
      }

      .buttons.mobile {
        display: none;
      }
    }
  `;

  hasPartialUpdate = true;

  private _controller: OwnedProgramsListButtonsController;

  private _upgradeMaxDesktopButton = createRef<SlButton>();
  private _upgradeMaxMobileButton = createRef<SlButton>();

  constructor() {
    super();

    this._controller = new OwnedProgramsListButtonsController(this);
  }

  render() {
    const isAutoupgradeActive = this.checkSomeProgramsAutoupgradeActive();

    const autoupgradeIcon = isAutoupgradeActive ? AUTOUPGRADE_VALUES.icon.enabled : AUTOUPGRADE_VALUES.icon.disabled;
    const autoupgradeLabel = isAutoupgradeActive
      ? COMMON_TEXTS.disableAutoupgradeAll()
      : COMMON_TEXTS.enableAutoupgradeAll();
    const autoupgradeVariant = isAutoupgradeActive
      ? AUTOUPGRADE_VALUES.buttonVariant.enabled
      : AUTOUPGRADE_VALUES.buttonVariant.disabled;

    const upgradeAllProgramsLabel = COMMON_TEXTS.upgradeAll();

    return html`
      <div class="buttons desktop">
        <sl-tooltip>
          <span slot="content"> ${upgradeAllProgramsLabel} </span>

          <sl-icon-button
            ${ref(this._upgradeMaxDesktopButton)}
            disabled
            name=${UPGRADE_MAX_VALUES.icon}
            label=${upgradeAllProgramsLabel}
            @click=${this.handleUpgradeMaxAllPrograms}
          >
          </sl-icon-button>
        </sl-tooltip>

        <sl-tooltip>
          <span slot="content"> ${autoupgradeLabel} </span>

          <sl-icon-button name=${autoupgradeIcon} label=${autoupgradeLabel} @click=${this.handleToggleAutoupgrade}>
          </sl-icon-button>
        </sl-tooltip>
      </div>

      <div class="buttons mobile">
        <sl-button
          ${ref(this._upgradeMaxMobileButton)}
          disabled
          variant=${UPGRADE_MAX_VALUES.buttonVariant}
          size="medium"
          @click=${this.handleUpgradeMaxAllPrograms}
        >
          <sl-icon slot="prefix" name=${UPGRADE_MAX_VALUES.icon}> </sl-icon>

          ${upgradeAllProgramsLabel}
        </sl-button>

        <sl-button variant=${autoupgradeVariant} size="medium" @click=${this.handleToggleAutoupgrade}>
          <sl-icon slot="prefix" name=${autoupgradeIcon}> </sl-icon>

          ${autoupgradeLabel}
        </sl-button>
      </div>
    `;
  }

  private checkSomeProgramsAutoupgradeActive(): boolean {
    const programs = this._controller.listOwnedPrograms();

    return programs.some((program) => program.autoUpgradeEnabled);
  }

  private handleToggleAutoupgrade = () => {
    const active = this.checkSomeProgramsAutoupgradeActive();

    this._controller.toggleAutoUpgrade(!active);
  };

  private handleUpgradeMaxAllPrograms = () => {
    this._controller.upgradeMaxAllPrograms();
  };

  handlePartialUpdate = () => {
    const upgradeMaxButtonDisabled = !this._controller.checkCanUpgradeMax();

    if (this._upgradeMaxDesktopButton.value) {
      this._upgradeMaxDesktopButton.value.disabled = upgradeMaxButtonDisabled;
    }

    if (this._upgradeMaxMobileButton.value) {
      this._upgradeMaxMobileButton.value.disabled = upgradeMaxButtonDisabled;
    }
  };
}
