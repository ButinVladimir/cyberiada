import { ScrollableComponentElement } from 'scrollable-component';
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
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

  private static SCROLL_EPS = 1;

  private _messageLogContentController: MessageLogContentController;

  private _scrollableComponentRef = createRef<ScrollableComponentElement>();

  @state()
  private _scrollSticky = true;

  constructor() {
    super();

    this._messageLogContentController = new MessageLogContentController(this);
  }

  firstUpdated() {
    if (this._scrollableComponentRef.value) {
      this._scrollableComponentRef.value.viewport.addEventListener('scroll', this.handleScroll);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._scrollableComponentRef.value) {
      this._scrollableComponentRef.value.viewport.removeEventListener('scroll', this.handleScroll);
    }
  }

  updated() {
    if (this._scrollSticky && this._scrollableComponentRef.value) {
      const viewport = this._scrollableComponentRef.value.viewport;
      viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'instant' });
    }
  }

  render() {
    const messages = this._messageLogContentController.getMessages();

    return html`
      <scrollable-component ${ref(this._scrollableComponentRef)}>
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

  private handleScroll = () => {
    if (!this._scrollableComponentRef.value) {
      return;
    }

    const viewport = this._scrollableComponentRef.value.viewport;

    this._scrollSticky =
      viewport.scrollHeight - Math.ceil(viewport.scrollTop) - MessageLogContent.SCROLL_EPS <= viewport.clientHeight;
  };
}
