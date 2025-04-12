import { css, html, nothing } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseComponent } from '@shared/base-component';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { ProgramAlert } from '@shared/types';
import * as types from '@state/mainframe-state/states/progam-factory/types';
import { SCREEN_WIDTH_POINTS, hintIconStyle } from '@shared/styles';
import { type ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { COMMON_TEXTS, PROGRAM_TEXTS } from '@texts/index';
import { ProcessesListItemController } from './controller';

@localized()
@customElement('ca-processes-list-item')
export class ProcessesListItem extends BaseComponent<ProcessesListItemController> {
  static styles = [
    hintIconStyle,
    css`
      :host {
        display: grid;
        grid-template-areas:
          'program'
          'progress-bar'
          'cores'
          'buttons';
        grid-template-columns: auto;
        grid-template-rows: repeat(1fr);
        gap: var(--sl-spacing-small);
        padding: var(--sl-spacing-small);
        box-sizing: border-box;
      }

      .desktop {
        display: none;
      }

      .program {
        grid-area: program;
      }

      .cores {
        grid-area: cores;
      }

      .progress-bar {
        grid-area: progress-bar;
      }

      .buttons {
        grid-area: buttons;
        align-items: center;
        flex-direction: row;
        gap: var(--sl-spacing-small);
      }

      .buttons.desktop {
        justify-content: flex-end;
        font-size: var(--sl-font-size-large);
      }

      .buttons.mobile {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      sl-icon[name='grip-vertical'] {
        position: relative;
        top: 0.2em;
        color: var(--ca-hint-color);
        font-size: var(--sl-font-size-large);
      }

      #delete-btn::part(base):hover {
        color: var(--sl-color-danger-600);
      }

      .program-title {
        cursor: grab;
      }

      .program-title sl-icon-button#description-button {
        position: relative;
        top: 3px;
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
          grid-template-areas: 'program cores progress-bar buttons';
          grid-template-columns: 3fr 1fr 2fr 6rem;
          grid-template-rows: auto;
          align-items: center;
        }

        .desktop {
          display: block;
        }

        .mobile {
          display: none;
        }

        .buttons.mobile {
          display: none;
        }

        .buttons.desktop {
          display: flex;
        }
      }
    `,
  ];

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName: ProgramName = types.OtherProgramName.shareServer;

  @state()
  _descriptionVisible = false;

  protected controller: ProcessesListItemController;

  constructor() {
    super();

    this.controller = new ProcessesListItemController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteProcessDialog);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteProcessDialog);
  }

  render() {
    const formatter = this.controller.formatter;
    const process = this.controller.getProcess(this.programName as types.ProgramName);

    if (!process) {
      return nothing;
    }

    const programTitle = PROGRAM_TEXTS[this.programName].title();

    const descriptionButtonName = this._descriptionVisible ? 'chevron-down' : 'chevron-right';
    const descriptionButtonLabel = this._descriptionVisible
      ? COMMON_TEXTS.hideDescription()
      : COMMON_TEXTS.showDescription();
    const descriptionClasses = classMap({
      'program-description': true,
      visible: this._descriptionVisible,
    });

    const formattedUsedCores = formatter.formatNumberDecimal(process.usedCores);
    const formattedMaxCores = formatter.formatNumberDecimal(process.maxCores);
    const cores = process.program.isAutoscalable ? msg('Autoscalable') : `${formattedUsedCores} / ${formattedMaxCores}`;
    const coresFull = process.program.isAutoscalable
      ? msg('Autoscalable')
      : msg(str`Uses cores: ${formattedUsedCores} / ${formattedMaxCores}`);

    const toggleIcon = process.isActive ? 'play-fill' : 'pause-fill';
    const toggleLabel = process.isActive ? msg('Disable process') : msg('Enable process');
    const toggleVariant = process.isActive ? 'neutral' : 'default';

    const deleteProcessLabel = msg('Delete process');

    return html`
      <div class="program">
        <div class="program-title" draggable="true" @dragstart=${this.handleDragStart}>
          <sl-icon name="grip-vertical"> </sl-icon>

          ${programTitle}

          <sl-tooltip>
            <span slot="content">${descriptionButtonLabel}</span>

            <sl-icon-button
              name=${descriptionButtonName}
              id="description-button"
              @click=${this.handleToggleDescription}
            >
            </sl-icon-button>
          </sl-tooltip>
        </div>

        <div class=${descriptionClasses}>
          <ca-process-description-text program-name=${this.programName}></ca-process-description-text>
        </div>
      </div>

      <div class="cores mobile">${coresFull}</div>

      <div class="cores desktop">${cores}</div>

      <div class="progress-bar">
        <ca-processes-list-item-progress program-name=${process.program.name}> </ca-processes-list-item-progress>
      </div>

      <div class="buttons mobile">
        <sl-button variant=${toggleVariant} size="medium" @click=${this.handleToggleProcess}>
          ${toggleLabel}
        </sl-button>

        <sl-button variant="danger" size="medium" @click=${this.handleOpenDeleteProcessDialog}>
          ${deleteProcessLabel}
        </sl-button>
      </div>

      <div class="buttons desktop">
        <sl-tooltip>
          <span slot="content"> ${toggleLabel} </span>

          <sl-icon-button name=${toggleIcon} label=${toggleLabel} @click=${this.handleToggleProcess}> </sl-icon-button>
        </sl-tooltip>

        <sl-tooltip>
          <span slot="content"> ${deleteProcessLabel} </span>

          <sl-icon-button
            id="delete-btn"
            name="x-lg"
            label=${deleteProcessLabel}
            @click=${this.handleOpenDeleteProcessDialog}
          >
          </sl-icon-button>
        </sl-tooltip>
      </div>
    `;
  }

  private handleToggleDescription = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._descriptionVisible = !this._descriptionVisible;
  };

  private handleToggleProcess = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.controller.toggleProcess();
  };

  private handleOpenDeleteProcessDialog = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const programTitle = PROGRAM_TEXTS[this.programName].title();

    this.dispatchEvent(
      new ConfirmationAlertOpenEvent(
        ProgramAlert.processDelete,
        msg(str`Are you sure want to delete process for program "${programTitle}"? It's progress will be lost.`),
        this.programName,
      ),
    );
  };

  private handleConfirmDeleteProcessDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== ProgramAlert.processDelete || convertedEvent.gameAlertKey !== this.programName) {
      return;
    }

    this.controller.deleteProcess();
  };

  private handleDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.programName);
    }
  };
}
