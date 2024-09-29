import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import type { GameAlert } from '@shared/types';
import { ConfirmationAlertOpenEvent, ConfirmationAlertCloseEvent, ConfirmationAlertSubmitEvent } from './events';
import { ConfirmationAlertController } from './controller';

@customElement('ca-confirmation-alert')
export class ConfirmationAlert extends LitElement {
  static styles = css`
    sl-dialog::part(footer) {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: var(--sl-spacing-small);
    }

    p {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
    }
  `;

  private _confirmationAlertModalController: ConfirmationAlertController;

  private _gameAlertToggleRef = createRef<SlCheckbox>();

  @state()
  private _gameAlert?: GameAlert;

  @state()
  private _gameAlertKey?: string;

  @state()
  private _messageParams = '';

  @state()
  private _isOpen = false;

  @state()
  private _alertToggled = true;

  constructor() {
    super();

    this._confirmationAlertModalController = new ConfirmationAlertController(this);
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
        <p>
          <intl-message label="alerts:${this._gameAlert}:message" value=${this._messageParams}> Message </intl-message>
        </p>

        <sl-checkbox
          ref=${ref(this._gameAlertToggleRef)}
          size="medium"
          name="game-alert"
          ?checked=${this._alertToggled}
          @sl-change=${this.handleToggleAlert}
        >
          <intl-message label="ui:settings:alertToggle"> Toggle alert </intl-message>
        </sl-checkbox>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:cancel"> Cancel </intl-message>
        </sl-button>
        <sl-button slot="footer" size="medium" variant="danger" @click=${this.handleSubmit}>
          <intl-message label="ui:common:continue"> Continue </intl-message>
        </sl-button>
      </sl-dialog>
    `;
  }

  private handleOpen = (event: Event) => {
    event.stopPropagation();
    const convertedEvent = event as ConfirmationAlertOpenEvent;

    this._gameAlert = convertedEvent.gameAlert;
    this._messageParams = convertedEvent.messageParams;
    this._gameAlertKey = convertedEvent.gameAlertKey;

    if (this._confirmationAlertModalController.isGameAlertEnabled(this._gameAlert)) {
      this._isOpen = true;
      this._alertToggled = true;
    } else {
      this._isOpen = false;

      this.dispatchEvent(new ConfirmationAlertSubmitEvent(this._gameAlert, this._gameAlertKey));
    }
  };

  private handleClose = (event: Event) => {
    event.stopPropagation();

    this._isOpen = false;

    if (this._gameAlert) {
      this.dispatchEvent(new ConfirmationAlertCloseEvent(this._gameAlert, this._gameAlertKey));
    }
  };

  private handleSubmit = (event: Event) => {
    event.stopPropagation();

    if (this._gameAlert) {
      this._isOpen = false;

      this.dispatchEvent(new ConfirmationAlertSubmitEvent(this._gameAlert, this._gameAlertKey));
    }
  };

  private handleToggleAlert = (event: Event) => {
    event.stopPropagation();

    if (this._gameAlert && this._gameAlertToggleRef.value) {
      this._alertToggled = this._gameAlertToggleRef.value.checked;
      this._confirmationAlertModalController.toggleGameAlert(this._gameAlert, this._gameAlertToggleRef.value.checked);
    }
  };
}
