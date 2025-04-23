import { html, css, TemplateResult } from 'lit';
import { localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { IMessage } from '@state/message-log-state/interfaces/message';
import { MessageLogContentController } from './controller';

@localized()
@customElement('ca-message-log-content')
export class MessageLogContent extends BaseComponent<MessageLogContentController> {
  static styles = css`
    :host {
      display: block;
    }

    div.log-content {
      box-sizing: border-box;
      width: 100%;
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

  protected controller: MessageLogContentController;

  constructor() {
    super();

    this.controller = new MessageLogContentController(this);
  }

  render() {
    const messages = this.controller.getMessages();

    return html` <div class="log-content">${repeat(messages, (message) => message.id, this.renderMessage)}</div> `;
  }

  private renderMessage = (message: IMessage): TemplateResult => {
    return html` <p>${message.messageText}</p> `;
  };
}
