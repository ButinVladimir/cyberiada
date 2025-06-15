import { css, html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { provide } from '@lit/context';
import { BaseComponent } from '@shared/base-component';
import { type ProgramName, type IProgram } from '@state/mainframe-state/states';
import {
  DESCRIPTION_ICONS,
  SCREEN_WIDTH_POINTS,
  dragIconStyle,
  hintIconStyle,
} from '@shared/index';
import { COMMON_TEXTS, PROGRAM_TEXTS } from '@texts/index';
import { OwnedProgramsListItemController } from './controller';
import { programContext } from './contexts';

@localized()
@customElement('ca-owned-programs-list-item')
export class OwnedProgramsListItem extends BaseComponent {
  static styles = [
    hintIconStyle,
    dragIconStyle,
    css`
      :host {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: repeat(1fr);
        gap: var(--sl-spacing-small);
        padding: var(--sl-spacing-small);
        box-sizing: border-box;
      }

      .desktop {
        display: none;
      }

      .program-title {
        cursor: grab;
      }

      .program-title sl-icon-button.description-button {
        position: relative;
        top: 0.25rem;
      }

      .program-description {
        box-sizing: border-box;
        height: 0;
        overflow: hidden;
        color: var(--ca-hint-color);
        font-size: var(--ca-hint-font-size);
        line-height: var(--ca-hint-line-height);
      }

      .program-description.visible {
        height: auto;
        padding-top: var(--sl-spacing-medium);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        :host {
          grid-template-columns: 2fr 1fr 1fr auto;
          grid-template-rows: auto;
          align-items: center;
        }

        .desktop {
          display: block;
        }

        .mobile {
          display: none;
        }
      }
    `,
  ];

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName!: ProgramName;

  @state()
  _descriptionVisible = false;

  private _controller: OwnedProgramsListItemController;

  @provide({ context: programContext })
  private _program?: IProgram;

  constructor() {
    super();

    this._controller = new OwnedProgramsListItemController(this);
  }

  performUpdate() {
    this.updateContext();

    super.performUpdate();
  }

  render() {
    if (!this._program) {
      return nothing;
    }

    const formatter = this._controller.formatter;

    const descriptionButtonName = this._descriptionVisible ? DESCRIPTION_ICONS.expanded : DESCRIPTION_ICONS.hidden;
    const descriptionButtonLabel = this._descriptionVisible
      ? COMMON_TEXTS.hideDescription()
      : COMMON_TEXTS.showDescription();
    const descriptionClasses = classMap({
      'program-description': true,
      visible: this._descriptionVisible,
    });

    const programTitle = PROGRAM_TEXTS[this.programName].title();
    const formattedLevel = formatter.formatLevel(this._program.level);
    const formattedTier = formatter.formatTier(this._program.tier);

    return html`
      <div class="program">
        <div class="program-title" draggable="true" @dragstart=${this.handleDragStart}>
          <sl-icon name="grip-vertical"> </sl-icon>

          ${programTitle}

          <sl-tooltip>
            <span slot="content">${descriptionButtonLabel}</span>

            <sl-icon-button
              name=${descriptionButtonName}
              class="description-button"
              @click=${this.handleToggleDescription}
            >
            </sl-icon-button>
          </sl-tooltip>
        </div>

        <div class=${descriptionClasses}>
          <ca-owned-programs-list-item-description></ca-owned-programs-list-item-description>
        </div>
      </div>

      <div class="mobile">${COMMON_TEXTS.parameterValue(COMMON_TEXTS.tier(), formattedTier)}</div>

      <div class="desktop">${formattedTier}</div>

      <div class="mobile">${COMMON_TEXTS.parameterValue(COMMON_TEXTS.level(), formattedLevel)}</div>

      <div class="desktop">${formattedLevel}</div>

      <ca-owned-programs-list-item-buttons></ca-owned-programs-list-item-buttons>
    `;
  }

  private updateContext() {
    if (this.programName) {
      this._program = this._controller.getProgram(this.programName);
    } else {
      this._program = undefined;
    }
  }

  private handleToggleDescription = () => {
    this._descriptionVisible = !this._descriptionVisible;
  };

  private handleDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.programName);
    }
  };
}
