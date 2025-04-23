import { TemplateResult, css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent } from '@shared/base-component';
import { CLONE_ALERTS, GAME_STATE_ALERTS, PROGRAM_ALERTS } from '@shared/constants';
import { GameAlert } from '@shared/types';
import { COMMON_TEXTS } from '@texts/common';
import {
  hintStyle,
  sectionTitleStyle,
  mediumModalStyle,
  modalBodyScrollStyle,
  SCREEN_WIDTH_POINTS,
} from '@shared/styles';
import { AlertFilterDialogCloseEvent } from './events';
import { AlertFilterDialogController } from './controller';
import { ALERT_NAMES } from './constants';

@localized()
@customElement('ca-alert-filter-dialog')
export class AlertFilterDialog extends BaseComponent<AlertFilterDialogController> {
  static styles = [
    hintStyle,
    sectionTitleStyle,
    mediumModalStyle,
    modalBodyScrollStyle,
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
        margin-bottom: var(--sl-spacing-small);
      }

      div.events-container {
        display: grid;
        column-gap: var(--sl-spacing-3x-small);
        row-gap: var(--sl-spacing-3x-small);
        grid-template-columns: auto;
        grid-auto-rows: auto;
      }

      sl-divider {
        --spacing: var(--sl-spacing-medium);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        div.events-container {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `,
  ];

  protected controller: AlertFilterDialogController;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  constructor() {
    super();

    this.controller = new AlertFilterDialogController(this);
  }

  render() {
    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${msg('Alert filter')}</h4>

        <div class="body">
          <p class="hint">${msg('Enable alerts in filter to make them visible when event happens')}</p>

          <div class="events-container">
            ${repeat(GAME_STATE_ALERTS, (gameAlert) => gameAlert, this.renderGameAlertCheckbox)}
          </div>

          <sl-divider></sl-divider>

          <div class="events-container">${repeat(PROGRAM_ALERTS, (event) => event, this.renderGameAlertCheckbox)}</div>

          <sl-divider></sl-divider>

          <div class="events-container">${repeat(CLONE_ALERTS, (event) => event, this.renderGameAlertCheckbox)}</div>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          ${COMMON_TEXTS.close()}
        </sl-button>
      </sl-dialog>
    `;
  }

  private renderGameAlertCheckbox = (gameAlert: GameAlert): TemplateResult => {
    return html`
      <sl-checkbox
        size="small"
        name="event"
        value=${gameAlert}
        ?checked=${this.controller.isAlertEnabled(gameAlert)}
        @sl-change=${this.handleToggleAlert}
      >
        ${ALERT_NAMES[gameAlert]()}
      </sl-checkbox>
    `;
  };

  private handleClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new AlertFilterDialogCloseEvent());
  };

  private handleToggleAlert = (event: Event) => {
    const target = event.target as SlCheckbox;

    this.controller.toggleAlertFilterEvent(target.value as GameAlert, target.checked);
  };
}
