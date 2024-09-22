import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import type { GameAlert } from '@shared/types';
import { ConfirmationAlertCloseEvent, ConfirmationAlertSubmitEvent } from './events';
import { ConfirmationAlertModalController } from './controller';

@customElement('ca-confirmation-alert-modal')
export class ConfirmationAlertModal extends LitElement {
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

  private _confirmationAlertModalController: ConfirmationAlertModalController;

  private _gameAlertToggleRef = createRef<SlCheckbox>();

  @property({
    attribute: 'game-alert',
    type: String,
  })
  gameAlert!: GameAlert;

  @property({
    attribute: 'message-params',
    type: String,
  })
  messageParams = '';

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  private _isOpen = false;

  @state()
  private _alertToggled = true;

  constructor() {
    super();

    this._confirmationAlertModalController = new ConfirmationAlertModalController(this);
  }

  updated(_changedProperties: Map<string, any>) {
    if (_changedProperties.get('isOpen') === false) {
      this._alertToggled = true;
    }
  }

  render() {
    return html`
      <slot></slot>

      <sl-dialog no-header ?open=${this._isOpen} @sl-request-close=${this.handleClose}>
        <p>
          <intl-message label="alerts:${this.gameAlert}:message" value=${this.messageParams}> Message </intl-message>
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

  private handleClose = (event: Event) => {
    event.stopPropagation();

    this._isOpen = false;

    this.dispatchEvent(new ConfirmationAlertCloseEvent());
  };

  private handleSubmit = (event: Event) => {
    event.stopPropagation();

    if (this._gameAlertToggleRef.value) {
      this._confirmationAlertModalController.toggleGameAlert(this.gameAlert, this._gameAlertToggleRef.value.checked);
    }

    this.dispatchEvent(new ConfirmationAlertSubmitEvent());
  };

  private handleToggleAlert = (event: Event) => {
    event.stopPropagation();

    if (this._gameAlertToggleRef.value) {
      this._alertToggled = this._gameAlertToggleRef.value.checked;
    }
  };
}
