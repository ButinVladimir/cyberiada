import { TemplateResult, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import {
  BaseComponent,
  CLONE_ALERTS,
  GAME_STATE_ALERTS,
  PROGRAM_ALERTS,
  SIDEJOB_ALERTS,
  GameAlert,
} from '@shared/index';
import { COMMON_TEXTS } from '@texts/index';
import { AlertFilterDialogCloseEvent } from './events';
import { AlertFilterDialogController } from './controller';
import { ALERT_NAMES } from './constants';
import styles from './styles';

@localized()
@customElement('ca-alert-filter-dialog')
export class AlertFilterDialog extends BaseComponent {
  static styles = styles;

  protected hasMobileRender = true;

  private _controller: AlertFilterDialogController;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  constructor() {
    super();

    this._controller = new AlertFilterDialogController(this);
  }

  protected renderDesktop() {
    return this.renderContent(true);
  }

  protected renderMobile() {
    return this.renderContent(false);
  }

  private renderContent(desktop: boolean) {
    const bodyClasses = classMap({
      body: true,
      desktop: desktop,
      mobile: !desktop,
    });

    return html`
      <form id="alert-filter-dialog" @submit=${this.handleSubmit}>
        <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
          <h4 slot="label" class="title">${msg('Alert filter')}</h4>

          <div class=${bodyClasses}>
            <p class="hint">${msg('Enable alerts in filter to make them visible when event happens')}</p>

            <div class="events-container">
              ${repeat(GAME_STATE_ALERTS, (gameAlert) => gameAlert, this.renderGameAlertCheckbox)}
            </div>

            <sl-divider></sl-divider>

            <div class="events-container">
              ${repeat(PROGRAM_ALERTS, (event) => event, this.renderGameAlertCheckbox)}
            </div>

            <sl-divider></sl-divider>

            <div class="events-container">${repeat(CLONE_ALERTS, (event) => event, this.renderGameAlertCheckbox)}</div>

            <sl-divider></sl-divider>

            <div class="events-container">
              ${repeat(SIDEJOB_ALERTS, (event) => event, this.renderGameAlertCheckbox)}
            </div>
          </div>

          <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
            ${COMMON_TEXTS.close()}
          </sl-button>
        </sl-dialog>
      </form>
    `;
  }

  private renderGameAlertCheckbox = (gameAlert: GameAlert): TemplateResult => {
    return html`
      <sl-checkbox
        size="small"
        name="event"
        value=${gameAlert}
        ?checked=${this._controller.isAlertEnabled(gameAlert)}
        @sl-change=${this.handleToggleAlert}
      >
        ${ALERT_NAMES[gameAlert]()}
      </sl-checkbox>
    `;
  };

  private handleClose = () => {
    this.dispatchEvent(new AlertFilterDialogCloseEvent());
  };

  private handleToggleAlert = (event: Event) => {
    const target = event.target as SlCheckbox;

    this._controller.toggleAlertFilterEvent(target.value as GameAlert, target.checked);
  };

  private handleSubmit = (event: Event) => {
    event.preventDefault();
  };
}
