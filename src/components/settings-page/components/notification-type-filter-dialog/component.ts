import { TemplateResult, html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent, NOTIFICATION_TYPES, NotificationType } from '@shared/index';
import { COMMON_TEXTS } from '@texts/index';
import { NotificationTypeFilterDialogCloseEvent } from './events';
import { NotificationTypeFilterDialogController } from './controller';
import { NOTIFICATION_TYPE_NAMES } from './constants';
import styles from './styles';

@localized()
@customElement('ca-notification-type-filter-dialog')
export class NotificationTypeFilterDialog extends BaseComponent {
  static styles = styles;

  protected hasMobileRender = true;

  private _controller: NotificationTypeFilterDialogController;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  constructor() {
    super();

    this._controller = new NotificationTypeFilterDialogController(this);
  }

  protected renderDesktop() {
    return this.renderContent(true);
  }

  protected renderMobile() {
    return this.renderContent(false);
  }

  private renderContent(desktop: boolean) {
    const eventsContainerClasses = classMap({
      'events-container': true,
      desktop: desktop,
      mobile: !desktop,
    });

    return html`
      <form id="notification-type-filter-dialog" @submit=${this.handleSubmit}>
        <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
          <h4 slot="label" class="title">${msg('Notification type filter')}</h4>

          <div class="body">
            <p class="hint">${msg('Enable notification types in filter to make them visible when event happens')}</p>

            <div class=${eventsContainerClasses}>
              ${repeat(NOTIFICATION_TYPES, (gameAlert) => gameAlert, this.renderGameAlertCheckbox)}
            </div>
          </div>

          <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
            ${COMMON_TEXTS.close()}
          </sl-button>
        </sl-dialog>
      </form>
    `;
  }

  private renderGameAlertCheckbox = (notificationType: NotificationType): TemplateResult => {
    return html`
      <sl-checkbox
        size="small"
        name="event"
        value=${notificationType}
        ?checked=${this._controller.isNotificationTypeEnabled(notificationType)}
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

    this._controller.toggleNotificationTypeFilter(target.value as NotificationType, target.checked);
  };

  private handleSubmit = (event: Event) => {
    event.preventDefault();
  };
}
