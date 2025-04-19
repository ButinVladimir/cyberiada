import { css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent } from '@shared/base-component';
import type { GameAlert } from '@shared/types';
import { smallModalStyle, modalBodyScrollStyle } from '@shared/styles';
import { COMMON_TEXTS } from '@texts/common';
import { ConfirmationAlertOpenEvent, ConfirmationAlertCloseEvent, ConfirmationAlertSubmitEvent } from './events';
import { ConfirmationAlertController } from './controller';

@localized()
@customElement('ca-confirmation-alert')
export class ConfirmationAlert extends BaseComponent<ConfirmationAlertController> {
  static styles = [
    smallModalStyle,
    modalBodyScrollStyle,
    css`
      sl-dialog::part(footer) {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: var(--sl-spacing-small);
      }

      p {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-large);
      }
    `,
  ];

  protected controller: ConfirmationAlertController;

  private _gameAlertToggleRef = createRef<SlCheckbox>();

  @state()
  private _gameAlert?: GameAlert;

  @state()
  private _gameAlertKey?: string;

  @state()
  private _message = '';

  @state()
  private _isOpen = false;

  @state()
  private _alertToggled = true;

  constructor() {
    super();

    this.controller = new ConfirmationAlertController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertOpenEvent.type, this.handleOpen);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertOpenEvent.type, this.handleOpen);
  }

  render() {
    return html`
      <sl-dialog no-header ?open=${this._isOpen} @sl-request-close=${this.handleClose}>
        <p>${this._message}</p>

        <sl-checkbox
          ref=${ref(this._gameAlertToggleRef)}
          size="small"
          name="game-alert"
          ?checked=${this._alertToggled}
          @sl-change=${this.handleToggleAlert}
        >
          ${msg('Show alerts like this in the future')}
        </sl-checkbox>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          ${COMMON_TEXTS.cancel()}
        </sl-button>

        <sl-button slot="footer" size="medium" variant="danger" @click=${this.handleSubmit}>
          ${COMMON_TEXTS.continue()}
        </sl-button>
      </sl-dialog>
    `;
  }

  private handleOpen = (event: Event) => {
    event.stopPropagation();
    const convertedEvent = event as ConfirmationAlertOpenEvent;

    this._gameAlert = convertedEvent.gameAlert;
    this._message = convertedEvent.message;
    this._gameAlertKey = convertedEvent.gameAlertKey;

    if (this.controller.isGameAlertEnabled(this._gameAlert)) {
      this._isOpen = true;
      this._alertToggled = true;
    } else {
      this._isOpen = false;

      this.dispatchEvent(new ConfirmationAlertSubmitEvent(this._gameAlert, this._gameAlertKey));
    }
  };

  private handleClose = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    this._isOpen = false;

    if (this._gameAlert) {
      this.dispatchEvent(new ConfirmationAlertCloseEvent(this._gameAlert, this._gameAlertKey));
    }
  };

  private handleSubmit = (event: Event) => {
    event.stopPropagation();

    if (this._gameAlert) {
      this._isOpen = false;

      if (this._gameAlertToggleRef.value) {
        this.controller.toggleGameAlert(this._gameAlert, this._alertToggled);
      }

      this.dispatchEvent(new ConfirmationAlertSubmitEvent(this._gameAlert, this._gameAlertKey));
    }
  };

  private handleToggleAlert = (event: Event) => {
    event.stopPropagation();

    if (this._gameAlert && this._gameAlertToggleRef.value) {
      this._alertToggled = this._gameAlertToggleRef.value.checked;
    }
  };
}
