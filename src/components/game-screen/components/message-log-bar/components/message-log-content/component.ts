import { t } from 'i18next';
import { ScrollableComponentElement } from 'scrollable-component';
import { html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { IMessage } from '@state/message-log-state/interfaces/message';
import { MessageLogContentController } from './controller';

@customElement('ca-message-log-content')
export class MessageLogContent extends BaseComponent<MessageLogContentController> {
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

  protected controller: MessageLogContentController;

  private static SCROLL_EPS = 1;

  private _scrollableComponentRef = createRef<ScrollableComponentElement>();

  @state()
  private _scrollSticky = true;

  constructor() {
    super();

    this.controller = new MessageLogContentController(this);
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

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (this._scrollSticky && this._scrollableComponentRef.value) {
      const viewport = this._scrollableComponentRef.value.viewport;
      viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'instant' });
    }
  }

  renderContent() {
    const messages = this.controller.getMessages();

    return html`
      <scrollable-component ${ref(this._scrollableComponentRef)}>
        <div class="log-content">${repeat(messages, (message) => message.id, this.renderMessage)}</div>
      </scrollable-component>
    `;
  }

  private renderMessage = (message: IMessage): TemplateResult => {
    const parameters = message.parameters ?? {};

    return html`
      <p>
        [<intl-datetime time .value=${message.date}></intl-datetime>]
        ${t(`events:${message.event}:message`, { ns: 'ui', ...parameters })}
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
