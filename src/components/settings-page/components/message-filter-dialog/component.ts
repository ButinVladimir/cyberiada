import { TemplateResult, html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import {
  BaseComponent,
  GAME_STATE_EVENTS,
  PROGRAM_EVENTS,
  CLONE_EVENTS,
  SIDEJOB_EVENTS,
  CITY_EVENTS,
  MessageEvent,
} from '@shared/index';
import { COMMON_TEXTS } from '@texts/index';
import { MessageFilterDialogCloseEvent } from './events';
import { MessageFilterDialogController } from './controller';
import { MESSAGE_EVENT_NAMES } from './constants';
import styles from './styles';

@localized()
@customElement('ca-message-filter-dialog')
export class MessageFilterDialog extends BaseComponent {
  static styles = styles;

  protected hasMobileRender = true;

  private _controller: MessageFilterDialogController;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  constructor() {
    super();

    this._controller = new MessageFilterDialogController(this);
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
      <form id="message-filter-dialog" @submit=${this.handleSubmit}>
        <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
          <h4 slot="label" class="title">${msg('Message filter')}</h4>

          <div class=${bodyClasses}>
            <p class="hint">
              ${msg('Enable events in filter to receive messages about them in the log and as popups')}
            </p>

            <div class="events-container">${repeat(GAME_STATE_EVENTS, (event) => event, this.renderEventCheckbox)}</div>

            <sl-divider></sl-divider>

            <div class="events-container">${repeat(PROGRAM_EVENTS, (event) => event, this.renderEventCheckbox)}</div>

            <sl-divider></sl-divider>

            <div class="events-container">${repeat(CITY_EVENTS, (event) => event, this.renderEventCheckbox)}</div>

            <sl-divider></sl-divider>

            <div class="events-container">${repeat(CLONE_EVENTS, (event) => event, this.renderEventCheckbox)}</div>

            <sl-divider></sl-divider>

            <div class="events-container">${repeat(SIDEJOB_EVENTS, (event) => event, this.renderEventCheckbox)}</div>
          </div>

          <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
            ${COMMON_TEXTS.close()}
          </sl-button>
        </sl-dialog>
      </form>
    `;
  }

  private renderEventCheckbox = (event: MessageEvent): TemplateResult => {
    return html`
      <sl-checkbox
        size="small"
        name="event"
        value=${event}
        ?checked=${this._controller.isMessageEventEnabled(event)}
        @sl-change=${this.handleToggleEvent}
      >
        ${MESSAGE_EVENT_NAMES[event]()}
      </sl-checkbox>
    `;
  };

  private handleClose = () => {
    this.dispatchEvent(new MessageFilterDialogCloseEvent());
  };

  private handleToggleEvent = (event: Event) => {
    const target = event.target as SlCheckbox;

    this._controller.toggleMessageEvent(target.value as MessageEvent, target.checked);
  };

  private handleSubmit = (event: Event) => {
    event.preventDefault();
  };
}
