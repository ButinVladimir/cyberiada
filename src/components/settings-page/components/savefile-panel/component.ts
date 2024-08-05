import { LitElement, css, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { SavefilePanelController } from './controller';

@customElement('ca-savefile-panel')
export class SavefilePanel extends LitElement {
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

  private _savefilePanelController: SavefilePanelController;

  @query('input#import-file', true)
  private _importInput!: HTMLInputElement;

  @state()
  private _isDeleteSaveDialogOpen = false;

  constructor() {
    super();

    this._savefilePanelController = new SavefilePanelController(this);
  }

  render() {
    return html`
      <input type="file" id="import-file" @change=${this.handleChangeImportSavefile} />

      <sl-button variant="primary" type="button" size="medium" @click=${this.handleSaveGame}>
        <intl-message label="ui:settings:saveGame"> Save game </intl-message>
      </sl-button>

      <sl-button variant="default" type="button" size="medium" outline @click=${this.handleImportSavefile}>
        <intl-message label="ui:settings:importSavefile"> Import savefile </intl-message>
      </sl-button>

      <sl-button variant="default" type="button" size="medium" outline @click=${this.handleExportSavefile}>
        <intl-message label="ui:settings:exportSavefile"> Export savefile </intl-message>
      </sl-button>

      <sl-button variant="danger" type="button" size="medium" @click=${this.handleOpenDeleteSaveDataDialog}>
        <intl-message label="ui:settings:deleteSaveData"> Delete save data </intl-message>
      </sl-button>

      <ca-delete-save-data-dialog
        ?is-open=${this._isDeleteSaveDialogOpen}
        @delete-save-data-dialog-close=${this.handleCloseDeleteSaveDataDialog}
        @delete-save-data-dialog-submit=${this.handleDeleteSaveData}
      >
      </ca-delete-save-data-dialog>
    `;
  }

  private handleSaveGame = (event: Event) => {
    event.stopPropagation();

    this._savefilePanelController.saveGame();
  };

  private handleImportSavefile = (event: Event) => {
    event.stopPropagation();

    this._importInput.click();
  };

  private handleChangeImportSavefile = (event: Event) => {
    event.stopPropagation();

    const importedSavefile = this._importInput.files?.item(0);

    if (importedSavefile) {
      this._savefilePanelController.importSavefile(importedSavefile);
    }
  };

  private handleExportSavefile = (event: Event) => {
    event.stopPropagation();

    this._savefilePanelController.exportSavefile();
  };

  private handleOpenDeleteSaveDataDialog = (event: Event) => {
    event.stopPropagation();

    this._isDeleteSaveDialogOpen = true;
  };

  private handleCloseDeleteSaveDataDialog = (event: Event) => {
    event.stopPropagation();

    this._isDeleteSaveDialogOpen = false;
  };

  private handleDeleteSaveData = async (event: Event) => {
    event.stopPropagation();

    await this._savefilePanelController.deleteSaveData();
    this._isDeleteSaveDialogOpen = false;
  };
}
