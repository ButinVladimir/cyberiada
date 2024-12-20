import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramsPanelController } from './controller';

@customElement('ca-mainframe-programs-panel')
export class MainframeProgramsPanel extends BaseComponent<ProgramsPanelController> {
  static styles = css`
    :host {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: var(--sl-spacing-large);
    }

    p.hint {
      margin: 0;
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    div.buttons-container {
      display: flex;
      gap: var(--sl-spacing-medium);
    }
  `;

  protected controller: ProgramsPanelController;

  @state()
  private _isPurchaseProgramDialogOpen = false;

  constructor() {
    super();

    this.controller = new ProgramsPanelController(this);
  }

  renderContent() {
    return html`
      <p class="hint">
        <intl-message label="ui:mainframe:programs:programsHint">
          Press either ctrl or shift to buy 10 levels. Press both ctrl and shift to buy 100 levels.
        </intl-message>
      </p>

      <div class="buttons-container">
        <sl-button variant="primary" size="medium" @click=${this.handlePurchaseProgramDialogOpen}>
          <intl-message label="ui:mainframe:programs:purchaseProgram"> Purchase a program </intl-message>
        </sl-button>

        <sl-button variant="default" size="medium" @click=${this.handleUpgradeMaxAllPrograms}>
          <intl-message label="ui:mainframe:programs:upgradeMaxAllPrograms"> Upgrade all programs </intl-message>
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
