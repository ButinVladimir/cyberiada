import { TemplateResult, css, html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent } from '@shared/base-component';
import { NOTIFICATION_TYPES } from '@shared/constants';
import { NotificationType } from '@shared/types';
import { COMMON_TEXTS } from '@texts/common';
import {
  hintStyle,
  sectionTitleStyle,
  mediumModalStyle,
  modalBodyScrollStyle,
  SCREEN_WIDTH_POINTS,
} from '@shared/styles';
import { NotificationTypeFilterDialogCloseEvent } from './events';
import { NotificationTypeFilterDialogController } from './controller';
import { NOTIFICATION_TYPE_NAMES } from './constants';

@localized()
@customElement('ca-notification-type-filter-dialog')
export class NotificationTypeFilterDialog extends BaseComponent<NotificationTypeFilterDialogController> {
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

  protected controller: NotificationTypeFilterDialogController;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  constructor() {
    super();

    this.controller = new NotificationTypeFilterDialogController(this);
  }

  render() {
    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${msg('Notification type filter')}</h4>

        <div class="body">
          <p class="hint">${msg('Enable notification types in filter to make them visible when event happens')}</p>

          <div class="events-container">
            ${repeat(NOTIFICATION_TYPES, (gameAlert) => gameAlert, this.renderGameAlertCheckbox)}
          </div>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          ${COMMON_TEXTS.close()}
        </sl-button>
      </sl-dialog>
    `;
  }

  private renderGameAlertCheckbox = (notificationType: NotificationType): TemplateResult => {
    return html`
      <sl-checkbox
        size="small"
        name="event"
        value=${notificationType}
        ?checked=${this.controller.isNotificationTypeEnabled(notificationType)}
        @sl-change=${this.handleToggleAlert}
      >
        ${NOTIFICATION_TYPE_NAMES[notificationType]()}
      </sl-checkbox>
    `;
  };

  private handleClose = () => {
    this.dispatchEvent(new NotificationTypeFilterDialogCloseEvent());
  };

  private handleToggleAlert = (event: Event) => {
    const target = event.target as SlCheckbox;

    this.controller.toggleNotificationTypeFilter(target.value as NotificationType, target.checked);
  };
}
