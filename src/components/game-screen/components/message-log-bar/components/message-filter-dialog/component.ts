import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { GAME_STATE_EVENTS } from '@shared/constants';
import { GameStateEvent } from '@shared/types';
import { MessageFilterDialogClose } from './events';
import { MessageFilterDialogController } from './controller';

@customElement('ca-message-filter-dialog')
export class MessageFilterDialog extends LitElement {
  static styles = css`
    sl-dialog {
      --width: 40rem;
    }

    h4.title {
      font-weight: var(--sl-font-weight-bold);
      margin: 0;
    }

    div.body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--sl-spacing-small);
    }

    div.events-container {
      display: grid;
      column-gap: var(--sl-spacing-3x-small);
      row-gap: var(--sl-spacing-3x-small);
      grid-template-columns: repeat(2, minmax(0, 30em));
      grid-auto-rows: auto;
    }
  `;

  private _messageFilterDialogController: MessageFilterDialogController;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  constructor() {
    super();

    this._messageFilterDialogController = new MessageFilterDialogController(this);
  }

  render() {
    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleMessageFilterDialogClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:messageLog:messageFilter"> Message filter </intl-message>
        </h4>

        <div class="body">
          <intl-message label="ui:messageLog:messageFilterHint">
            Enable events in filter to start adding messages for them in log.
          </intl-message>

          <div class="events-container">${repeat(GAME_STATE_EVENTS, (event) => event, this.renderEventCheckbox)}</div>
        </div>

        <sl-button slot="footer" size="large" variant="default" outline @click=${this.handleMessageFilterDialogClose}>
          <intl-message label="ui:common:close" @click=${this.handleMessageFilterDialogClose}> Close </intl-message>
        </sl-button>
      </sl-dialog>
    `;
  }

  private renderEventCheckbox = (event: GameStateEvent): TemplateResult => {
    return html`
      <sl-checkbox
        size="medium"
        name="event"
        value=${event}
        ?checked=${this._messageFilterDialogController.isMessageFilterEventEnabled(event)}
        @sl-change=${this.handleToggleEvent}
      >
        <intl-message label=${`events:names:${event}`}> ${event} </intl-message>
      </sl-checkbox>
    `;
  };

  private handleMessageFilterDialogClose = (event: Event) => {
    event.stopPropagation();

    this.dispatchEvent(new MessageFilterDialogClose());
  };

  private handleToggleEvent = (event: Event) => {
    const target = event.target as SlCheckbox;

    this._messageFilterDialogController.toggleMessageFilterEvent(target.value as GameStateEvent, target.checked);
  };
}
