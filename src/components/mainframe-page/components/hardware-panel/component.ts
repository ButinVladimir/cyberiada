import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { BaseComponent } from '@shared/base-component';
import { IMainframeHardwareParameter } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-parameter';
import type { MainframeHardwareParameterType } from '@state/mainframe/mainframe-hardware-state/types';
import { EMPTY_IMAGE } from '@shared/constants';
import { moveElementInArray } from '@shared/helpers';
import { MainframeHardwarePanelController } from './controller';
import { ARTICLE_HEIGHT_WITHOUT_GAP, ARTICLE_HEIGHT_WITH_GAP } from './constants';

@customElement('ca-mainframe-hardware-panel')
export class MainframeHardwarePanel extends BaseComponent<MainframeHardwarePanelController> {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: var(--ca-viewport-width);
    }

    p.hint {
      margin: 0 0 var(--sl-spacing-large);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    div.articles-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      gap: var(--sl-spacing-large);
    }

    div.articles-list ca-mainframe-hardware-panel-article {
      width: 100%;
      height: ${ARTICLE_HEIGHT_WITHOUT_GAP}px;
    }

    div.articles-list ca-mainframe-hardware-panel-article.dragged {
      background-color: var(--ca-dragged-color);
    }
  `;

  protected controller: MainframeHardwarePanelController;

  private _articlesListRef = createRef<HTMLDivElement>();

  @state()
  private _shiftPressed = false;

  @state()
  private _ctrlPressed = false;

  @state()
  private _draggedParameterType: MainframeHardwareParameterType | undefined;

  @state()
  private _draggedParameterPosition: number | undefined;

  constructor() {
    super();

    this.controller = new MainframeHardwarePanelController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('keydown', this.handleKeypress);
    window.addEventListener('keyup', this.handleKeypress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('keydown', this.handleKeypress);
    window.removeEventListener('keyup', this.handleKeypress);
  }

  renderContent() {
    return html`
      <p class="hint">
        <intl-message label="ui:mainframe:hardware:keyboardHint">
          Press either ctrl or shift to buy 10 levels. Press both ctrl and shift to buy 100 levels.
        </intl-message>
      </p>

      <div class="articles-list" ${ref(this._articlesListRef)} @dragover=${this.handleDragOver}>
        ${this.renderParametersList()}
      </div>
    `;
  }

  private renderParametersList = () => {
    let parameters = this.controller.listParameters();

    if (this._draggedParameterType && this._draggedParameterPosition !== undefined) {
      const oldPosition = parameters.findIndex((program) => program.type === this._draggedParameterType);

      const reorderedPrograms = [...parameters];
      moveElementInArray(reorderedPrograms, oldPosition, this._draggedParameterPosition);

      parameters = reorderedPrograms;
    }

    return repeat(parameters, (parameter) => parameter.type, this.renderParameter);
  };

  private renderParameter = (parameter: IMainframeHardwareParameter) => {
    const maxIncrease = this.getMaxIncrease();

    return html`
      <ca-mainframe-hardware-panel-article
        class=${parameter.type === this._draggedParameterType ? 'dragged' : ''}
        type=${parameter.type}
        max-increase=${maxIncrease}
        @dragstart=${this.handleDragStart}
        @dragend=${this.handleDragEnd}
      >
      </ca-mainframe-hardware-panel-article>
    `;
  };

  private handleKeypress = (event: KeyboardEvent) => {
    this._shiftPressed = event.shiftKey;
    this._ctrlPressed = event.ctrlKey;
  };

  private getMaxIncrease(): number {
    let maxIncrease = 1;

    if (this._shiftPressed) {
      maxIncrease *= 10;
    }

    if (this._ctrlPressed) {
      maxIncrease *= 10;
    }

    return maxIncrease;
  }

  private handleDragStart = (event: DragEvent) => {
    event.stopPropagation();

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.setDragImage(EMPTY_IMAGE, 0, 0);

      this._draggedParameterType = event.dataTransfer.getData('text/plain') as MainframeHardwareParameterType;
    }
  };

  private handleDragOver = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (this._articlesListRef.value) {
      const boundingRect = this._articlesListRef.value.getBoundingClientRect();
      const relativeTop = Math.max(event.clientY - boundingRect.top, 0);

      this._draggedParameterPosition = Math.min(
        Math.floor(relativeTop / ARTICLE_HEIGHT_WITH_GAP),
        this.controller.listParameters().length - 1,
      );
    }
  };

  private handleDragEnd = (event: Event) => {
    event.stopPropagation();

    if (this._draggedParameterType && this._draggedParameterPosition !== undefined) {
      this.controller.moveParameter(this._draggedParameterType, this._draggedParameterPosition);
    }

    this._draggedParameterType = undefined;
    this._draggedParameterPosition = undefined;
  };
}
