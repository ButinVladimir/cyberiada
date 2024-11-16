import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { BaseComponent } from '@shared/base-component';
import { GameStateAlert } from '@shared/types';
import { ConfirmationAlertOpenEvent, ConfirmationAlertSubmitEvent } from '@components/shared/confirmation-alert/events';
import { SavefilePanelController } from './controller';

@customElement('ca-savefile-panel')
export class SavefilePanel extends BaseComponent<SavefilePanelController> {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--sl-spacing-large);
    }

    input#import-file {
      display: none;
    }
  `;

  protected controller: SavefilePanelController;

  private _importInputRef = createRef<HTMLInputElement>();

  constructor() {
    super();

    this.controller = new SavefilePanelController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmImportSavefileDialog);
    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteSaveDataDialog);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmImportSavefileDialog);
    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteSaveDataDialog);
  }

  renderContent() {
    return html`
      <input ${ref(this._importInputRef)} type="file" id="import-file" @change=${this.handleChangeImportSavefile} />

      <sl-button variant="primary" type="button" size="medium" @click=${this.handleSaveGame}>
        <intl-message label="ui:settings:saveGame"> Save game </intl-message>
      </sl-button>

      <sl-button variant="default" type="button" size="medium" outline @click=${this.handleOpenImportSavefileDialog}>
        <intl-message label="ui:settings:importSavefile"> Import savefile </intl-message>
      </sl-button>

      <sl-button variant="default" type="button" size="medium" outline @click=${this.handleExportSavefile}>
        <intl-message label="ui:settings:exportSavefile"> Export savefile </intl-message>
      </sl-button>

      <sl-button variant="danger" type="button" size="medium" @click=${this.handleOpenDeleteSaveDataDialog}>
        <intl-message label="ui:settings:deleteSaveData"> Delete save data </intl-message>
      </sl-button>
    `;
  }

  private handleSaveGame = (event: Event) => {
    event.stopPropagation();

    this.controller.saveGame();
  };

  private handleOpenImportSavefileDialog = (event: Event) => {
    event.stopPropagation();

    this.dispatchEvent(new ConfirmationAlertOpenEvent(GameStateAlert.saveImport, ''));
  };

  private handleConfirmImportSavefileDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== GameStateAlert.saveImport) {
      return;
    }

    if (this._importInputRef.value) {
      this._importInputRef.value.click();
    }
  };

  private handleChangeImportSavefile = (event: Event) => {
    event.stopPropagation();

    if (!this._importInputRef.value) {
      return;
    }

    const importedSavefile = this._importInputRef.value.files?.item(0);

    if (importedSavefile) {
      this.controller.importSavefile(importedSavefile);
    }
  };

  private handleExportSavefile = (event: Event) => {
    event.stopPropagation();

    this.controller.exportSavefile();
  };

  private handleOpenDeleteSaveDataDialog = (event: Event) => {
    event.stopPropagation();

    this.dispatchEvent(new ConfirmationAlertOpenEvent(GameStateAlert.saveDelete, ''));
  };

  private handleConfirmDeleteSaveDataDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== GameStateAlert.saveDelete) {
      return;
    }

    this.controller.deleteSaveData().catch((e) => {
      console.error(e);
    });
  };
}
