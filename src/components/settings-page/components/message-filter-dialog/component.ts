import { TemplateResult, css, html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { GAME_STATE_EVENTS, PURCHASE_EVENTS, PROGRAM_EVENTS, CLONE_EVENTS } from '@shared/constants';
import { MessageEvent } from '@shared/types';
import {
  hintStyle,
  sectionTitleStyle,
  mediumModalStyle,
  modalBodyScrollStyle,
  SCREEN_WIDTH_POINTS,
} from '@shared/styles';
import { COMMON_TEXTS } from '@texts/common';
import { MessageFilterDialogCloseEvent } from './events';
import { MessageFilterDialogController } from './controller';
import { MESSAGE_EVENT_NAMES } from './constants';

@localized()
@customElement('ca-message-filter-dialog')
export class MessageFilterDialog extends BaseComponent<MessageFilterDialogController> {
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

  protected controller: MessageFilterDialogController;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  constructor() {
    super();

    this.controller = new MessageFilterDialogController(this);
  }

  render() {
    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${msg('Message filter')}</h4>

        <div class="body">
          <p class="hint">${msg('Enable events in filter to receive messages about them in the log and as popups')}</p>

          <div class="events-container">${repeat(GAME_STATE_EVENTS, (event) => event, this.renderEventCheckbox)}</div>

          <sl-divider></sl-divider>

          <div class="events-container">${repeat(PURCHASE_EVENTS, (event) => event, this.renderEventCheckbox)}</div>

          <sl-divider></sl-divider>

          <div class="events-container">${repeat(PROGRAM_EVENTS, (event) => event, this.renderEventCheckbox)}</div>

          <sl-divider></sl-divider>

          <div class="events-container">${repeat(CLONE_EVENTS, (event) => event, this.renderEventCheckbox)}</div>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          ${COMMON_TEXTS.close()}
        </sl-button>
      </sl-dialog>
    `;
  }

  private renderEventCheckbox = (event: MessageEvent): TemplateResult => {
    return html`
      <sl-checkbox
        size="small"
        name="event"
        value=${event}
        ?checked=${this.controller.isMessageEventEnabled(event)}
        @sl-change=${this.handleToggleEvent}
      >
        ${MESSAGE_EVENT_NAMES[event]()}
      </sl-checkbox>
    `;
  };

  private handleClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new MessageFilterDialogCloseEvent());
  };

  private handleToggleEvent = (event: Event) => {
    event.stopPropagation();
    const target = event.target as SlCheckbox;

    this.controller.toggleMessageEvent(target.value as MessageEvent, target.checked);
  };
}
