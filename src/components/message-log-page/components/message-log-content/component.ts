import { html, TemplateResult } from 'lit';
import { localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { IMessage } from '@state/message-log-state/interfaces/message';
import { MessageLogContentController } from './controller';
import styles from './styles';

@localized()
@customElement('ca-message-log-content')
export class MessageLogContent extends BaseComponent {
  static styles = styles;

  private _controller: MessageLogContentController;

  constructor() {
    super();

    this._controller = new MessageLogContentController(this);
  }

  protected renderDesktop() {
    const messages = this._controller.getMessages();

    return html` <div class="log-content">${repeat(messages, (message) => message.id, this.renderMessage)}</div> `;
  }

  private renderMessage = (message: IMessage): TemplateResult => {
    return html` <p>${message.messageText}</p> `;
  };
}
