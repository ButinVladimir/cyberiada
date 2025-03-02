import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent } from '@shared/base-component';
import type { GameAlert } from '@shared/types';
import { smallModalStyle, modalBodyScrollStyle } from '@shared/styles';
import { IHistoryState } from '@shared/interfaces';
import { ConfirmationAlertOpenEvent, ConfirmationAlertCloseEvent, ConfirmationAlertSubmitEvent } from './events';
import { ConfirmationAlertController } from './controller';
import { SUBMIT_DELAY } from './constants';

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
  private _messageParams = {};

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
    window.addEventListener('popstate', this.handlePopState);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertOpenEvent.type, this.handleOpen);
    window.removeEventListener('popstate', this.handlePopState);
  }

  renderContent() {
    return html`
      <sl-dialog no-header ?open=${this._isOpen} @sl-request-close=${this.handleClose}>
        <p>${t(`${this._gameAlert}.message`, { ns: 'alerts', ...this._messageParams })}</p>

        <sl-checkbox
          ref=${ref(this._gameAlertToggleRef)}
          size="small"
          name="game-alert"
          ?checked=${this._alertToggled}
          @sl-change=${this.handleToggleAlert}
        >
          ${t('settings.alertToggle', { ns: 'ui' })}
        </sl-checkbox>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          ${t('common.cancel', { ns: 'ui' })}
        </sl-button>

        <sl-button slot="footer" size="medium" variant="danger" @click=${this.handleSubmit}>
          ${t('common.continue', { ns: 'ui' })}
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

    if (this.controller.isGameAlertEnabled(this._gameAlert)) {
      this._isOpen = true;
      this._alertToggled = true;

      const historyState = { ...window.history.state, showConfirmationAlert: true } as IHistoryState;
      window.history.pushState(historyState, '');
    } else {
      this._isOpen = false;

      this.dispatchEvent(new ConfirmationAlertSubmitEvent(this._gameAlert, this._gameAlertKey));
    }
  };

  private handleClose = (event: Event) => {
    event.stopPropagation();

    window.history.back();
  };

  private handleSubmit = (event: Event) => {
    event.stopPropagation();

    if (this._gameAlert) {
      window.history.back();

      if (this._gameAlertToggleRef.value) {
        this.controller.toggleGameAlert(this._gameAlert, this._alertToggled);
      }

      const gameAlert = this._gameAlert;
      const gameAlertKey = this._gameAlertKey;
      setTimeout(() => {
        this.dispatchEvent(new ConfirmationAlertSubmitEvent(gameAlert, gameAlertKey));
      }, SUBMIT_DELAY);
    }
  };

  private handleToggleAlert = (event: Event) => {
    event.stopPropagation();

    if (this._gameAlert && this._gameAlertToggleRef.value) {
      this._alertToggled = this._gameAlertToggleRef.value.checked;
    }
  };

  private handlePopState = (event: PopStateEvent) => {
    const state = event.state as IHistoryState;

    this._isOpen = state.showConfirmationAlert;

    if (this._gameAlert) {
      this.dispatchEvent(new ConfirmationAlertCloseEvent(this._gameAlert, this._gameAlertKey));
    }
  };
}
