import { css, html, nothing } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent } from '@shared/base-component';
import {
  inputLabelStyle,
  hintStyle,
  sectionTitleStyle,
  modalBodyScrollStyle,
  smallModalStyle,
  warningStyle,
} from '@shared/styles';
import { COMMON_TEXTS } from '@texts/index';
import { RenameCloneDialogController } from './controller';
import { CloseCloneListItemDialogEvent } from '../../events/close-clone-list-item-dialog';

@localized()
@customElement('ca-rename-clone-dialog')
export class RenameCloneDialog extends BaseComponent<RenameCloneDialogController> {
  static styles = [
    inputLabelStyle,
    hintStyle,
    sectionTitleStyle,
    smallModalStyle,
    modalBodyScrollStyle,
    warningStyle,
    css`
      sl-dialog::part(body) {
        padding-top: 0;
        padding-bottom: 0;
      }

      h4.title {
        margin: 0;
      }

      div.body {
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      p.hint {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-medium);
      }

      div.footer {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      p.warning {
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
      }
      div.footer div.buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--sl-spacing-medium);
      }
    `,
  ];

  protected controller: RenameCloneDialogController;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  @property({
    attribute: 'clone-id',
    type: String,
  })
  cloneId?: string;

  @state()
  private _newName = '';

  private _newNameInputRef = createRef<SlInput>();

  constructor() {
    super();

    this.controller = new RenameCloneDialogController(this);
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (_changedProperties.has('isOpen') && this.cloneId) {
      this._newName = this.controller.getCloneById(this.cloneId)?.name ?? '';
    }
  }

  render() {
    if (!this.cloneId) {
      return nothing;
    }

    const clone = this.controller.getCloneById(this.cloneId);

    if (!clone) {
      return nothing;
    }

    const warning = this.getWarning();

    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${msg(str`Rename clone "${clone.name}"`)}</h4>

        <div class="body">
          <p class="hint">${msg(str`Enter new name for clone.`)}</p>

          <sl-input
            ${ref(this._newNameInputRef)}
            name="newName"
            value=${this._newName}
            autocomplete="off"
            @sl-change=${this.handleNewNameChange}
          >
            <span class="input-label" slot="label"> ${msg('New name')} </span>

            <sl-icon-button slot="suffix" label=${msg('Generate name')} name="dice-4" @click=${this.handleGenerateName}>
            </sl-icon-button>
          </sl-input>
        </div>

        <div slot="footer" class="footer">
          <p class="warning">${warning}</p>

          <div class="buttons">
            <sl-button size="medium" variant="default" outline @click=${this.handleClose}>
              ${COMMON_TEXTS.cancel()}
            </sl-button>

            <sl-button ?disabled=${!this._newName} size="medium" variant="primary" @click=${this.handleSubmit}>
              ${COMMON_TEXTS.continue()}
            </sl-button>
          </div>
        </div>
      </sl-dialog>
    `;
  }

  private getWarning(): string {
    if (!this._newName) {
      return msg('Enter new name');
    }

    return '';
  }

  private handleClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new CloseCloneListItemDialogEvent());
  };

  private handleNewNameChange = () => {
    if (!this._newNameInputRef.value) {
      return;
    }

    this._newName = this._newNameInputRef.value.value;
  };

  private handleGenerateName = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    this.generateName();
  };

  private generateName(): void {
    this.controller
      .generateName()
      .then((name) => {
        this._newName = name;
      })
      .catch((e) => console.error(e));
  }

  private handleSubmit = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!this._newName) {
      return;
    }

    this.controller.renameCloneById(this.cloneId!, this._newName);
    this.dispatchEvent(new CloseCloneListItemDialogEvent());
  };
}
