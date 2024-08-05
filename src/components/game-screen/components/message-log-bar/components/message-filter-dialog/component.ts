import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MessageFilterDialogClose } from './events';

@customElement('ca-message-filter-dialog')
export class MessageFilterDialog extends LitElement {
  static styles = css`
    h4.title {
      font-weight: var(--sl-font-weight-bold);
      margin: 0;
    }
  `;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  render() {
    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleMessageFilterDialogClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:messageLog:messageFilter"> Message filter </intl-message>
        </h4>

        <intl-message label="ui:messageLog:messageFilterHint">
          Enable events in filter to start adding messages for them in log.
        </intl-message>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleMessageFilterDialogClose}>
          <intl-message label="ui:common:close" @click=${this.handleMessageFilterDialogClose}> Close </intl-message>
        </sl-button>
      </sl-dialog>
    `;
  }

  private handleMessageFilterDialogClose = (event: Event) => {
    event.stopPropagation();

    this.dispatchEvent(new MessageFilterDialogClose());
  };
}
