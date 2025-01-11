import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { ProgramsPanelController } from './controller';

@customElement('ca-mainframe-programs-panel')
export class MainframeProgramsPanel extends BaseComponent<ProgramsPanelController> {
  static styles = [
    hintStyle,
    css`
      :host {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: var(--sl-spacing-large);
      }

      p.hint {
        margin: 0;
      }

      div.buttons-container {
        display: flex;
        gap: var(--sl-spacing-medium);
      }
    `,
  ];

  protected controller: ProgramsPanelController;

  @state()
  private _isPurchaseProgramDialogOpen = false;

  constructor() {
    super();

    this.controller = new ProgramsPanelController(this);
  }

  renderContent() {
    return html`
      <p class="hint">${t('mainframe.programs.programsHint', { ns: 'ui' })}</p>

      <div class="buttons-container">
        <sl-button variant="primary" size="medium" @click=${this.handlePurchaseProgramDialogOpen}>
          ${t('mainframe.programs.purchaseProgram', { ns: 'ui' })}
        </sl-button>

        <sl-button variant="default" size="medium" @click=${this.handleUpgradeMaxAllPrograms}>
          ${t('mainframe.programs.upgradeMaxAllPrograms', { ns: 'ui' })}
        </sl-button>
      </div>

      <ca-owned-programs-list></ca-owned-programs-list>

      <ca-purchase-program-dialog
        ?is-open=${this._isPurchaseProgramDialogOpen}
        @purchase-program-dialog-close=${this.handlePurchaseProgramDialogClose}
      >
      </ca-purchase-program-dialog>
    `;
  }

  private handlePurchaseProgramDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isPurchaseProgramDialogOpen = true;
  };

  private handlePurchaseProgramDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isPurchaseProgramDialogOpen = false;
  };

  private handleUpgradeMaxAllPrograms = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.controller.upgradeMaxAllPrograms();
  };
}
