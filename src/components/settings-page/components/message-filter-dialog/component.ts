import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { GAME_STATE_EVENTS, PURCHASE_EVENTS, PROGRAM_EVENTS } from '@shared/constants';
import { MessageEvent } from '@shared/types';
import { MessageFilterDialogCloseEvent } from './events';
import { MessageFilterDialogController } from './controller';

@customElement('ca-message-filter-dialog')
export class MessageFilterDialog extends LitElement {
  static styles = css`
    sl-dialog {
      --width: 50rem;
    }

    sl-dialog::part(body) {
      padding-top: 0;
      padding-bottom: 0;
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
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
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    div.events-container {
      display: grid;
      column-gap: var(--sl-spacing-3x-small);
      row-gap: var(--sl-spacing-3x-small);
      grid-template-columns: repeat(2, minmax(0, 30em));
      grid-auto-rows: auto;
    }

    sl-divider {
      --spacing: var(--sl-spacing-medium);
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
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:settings:messageFilter"> Message filter </intl-message>
        </h4>

        <div class="body">
          <p class="hint">
            <intl-message label="ui:settings:messageFilterHint">
              Enable events in filter to start adding messages for them in log.
            </intl-message>
          </p>

          <div class="events-container">${repeat(GAME_STATE_EVENTS, (event) => event, this.renderEventCheckbox)}</div>

          <sl-divider></sl-divider>

          <div class="events-container">${repeat(PURCHASE_EVENTS, (event) => event, this.renderEventCheckbox)}</div>

          <sl-divider></sl-divider>

          <div class="events-container">${repeat(PROGRAM_EVENTS, (event) => event, this.renderEventCheckbox)}</div>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:close"> Close </intl-message>
        </sl-button>
      </sl-dialog>
    `;
  }

  private renderEventCheckbox = (event: MessageEvent): TemplateResult => {
    return html`
      <sl-checkbox
        size="medium"
        name="event"
        value=${event}
        ?checked=${this._messageFilterDialogController.isMessageEventEnabled(event)}
        @sl-change=${this.handleToggleEvent}
      >
        <intl-message label=${`events:${event}:name`}> Event </intl-message>
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

    this._messageFilterDialogController.toggleMessageEvent(target.value as MessageEvent, target.checked);
  };
}
