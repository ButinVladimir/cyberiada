import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { IMessage } from '@state/message-log-state/interfaces/message';
import { MessageLogContentController } from './controller';

@customElement('ca-message-log-content')
export class MessageLogContent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    scrollable-component {
      width: 100%;
      height: 100%;
      --scrollbar-width: var(--ca-scrollbar-width);
      --scrollbar-thumb-fill-color: var(--ca-scrollbar-thumb-fill-color);
      --scrollbar-thumb-fill-color-hover: var(--ca-scrollbar-thumb-fill-color-hover);
    }

    div.log-content {
      box-sizing: border-box;
      width: 100%;
      padding: var(--sl-spacing-small);
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--sl-spacing-3x-small);
    }

    p {
      margin-top: 0;
      margin-bottom: 0;
    }
  `;

  private _messageLogContentController: MessageLogContentController;

  constructor() {
    super();

    this._messageLogContentController = new MessageLogContentController(this);
  }

  render() {
    const messages = this._messageLogContentController.getMessages();

    return html`
      <scrollable-component>
        <div class="log-content">${repeat(messages, (message) => message.id, this.renderMessage)}</div>
      </scrollable-component>
    `;
  }

  private renderMessage = (message: IMessage): TemplateResult => {
    const parameters = message.parameters ? JSON.stringify(message.parameters) : undefined;
    const label = `events:${message.event}:message`;

    return html`
      <p>
        [<intl-datetime time .value=${message.date}></intl-datetime>]
        <intl-message label=${label} value=${ifDefined(parameters)}>Message</intl-message>
      </p>
    `;
  };
}
