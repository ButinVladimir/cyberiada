import { css, html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseComponent } from '@shared/base-component';
import { OtherProgramName, type ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import {
  AUTOUPGRADE_VALUES,
  DESCRIPTION_ICONS,
  SCREEN_WIDTH_POINTS,
  UPGRADE_MAX_VALUES,
  dragIconStyle,
  hintIconStyle,
} from '@shared/styles';
import { COMMON_TEXTS } from '@texts/common';
import { PROGRAM_TEXTS } from '@texts/programs';
import { OwnedProgramsListItemController } from './controller';

@localized()
@customElement('ca-owned-programs-list-item')
export class OwnedProgramsListItem extends BaseComponent<OwnedProgramsListItemController> {
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

      .buttons {
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
          grid-template-columns: 2fr 1fr 1fr 0;
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
  programName: ProgramName = OtherProgramName.shareServer;

  @state()
  _descriptionVisible = false;

  protected controller: OwnedProgramsListItemController;

  constructor() {
    super();

    this.controller = new OwnedProgramsListItemController(this);
  }

  render() {
    const formatter = this.controller.formatter;

    const program = this.controller.getProgram(this.programName);

    if (!program) {
      return nothing;
    }

    const descriptionButtonName = this._descriptionVisible ? DESCRIPTION_ICONS.expanded : DESCRIPTION_ICONS.hidden;
    const descriptionButtonLabel = this._descriptionVisible
      ? COMMON_TEXTS.hideDescription()
      : COMMON_TEXTS.showDescription();
    const descriptionClasses = classMap({
      'program-description': true,
      visible: this._descriptionVisible,
    });

    const autoupgradeIcon = program.autoUpgradeEnabled
      ? AUTOUPGRADE_VALUES.icon.enabled
      : AUTOUPGRADE_VALUES.icon.disabled;
    const autoupgradeLabel = program.autoUpgradeEnabled
      ? COMMON_TEXTS.disableAutoupgrade()
      : COMMON_TEXTS.enableAutoupgrade();
    const autoupgradeVariant = program.autoUpgradeEnabled
      ? AUTOUPGRADE_VALUES.buttonVariant.enabled
      : AUTOUPGRADE_VALUES.buttonVariant.disabled;

    const programTitle = PROGRAM_TEXTS[this.programName].title();
    const formattedLevel = formatter.formatLevel(program.level);
    const formattedQuality = formatter.formatQuality(program.quality);

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
          <ca-program-description-text program-name=${this.programName}></ca-program-description-text>
        </div>
      </div>

      <div class="mobile">${COMMON_TEXTS.levelValue(formattedLevel)}</div>

      <div class="desktop">${formattedLevel}</div>

      <div class="mobile">${COMMON_TEXTS.qualityValue(formattedQuality)}</div>

      <div class="desktop">${formattedQuality}</div>

      <div class="buttons mobile">
        <sl-button variant=${UPGRADE_MAX_VALUES.buttonVariant} size="medium" @click=${this.handleUpgradeMax}>
          <sl-icon slot="prefix" name=${UPGRADE_MAX_VALUES.icon}> </sl-icon>

          ${COMMON_TEXTS.upgrade()}
        </sl-button>

        <sl-button variant=${autoupgradeVariant} size="medium" @click=${this.handleToggleAutoUpgrade}>
          <sl-icon slot="prefix" name=${autoupgradeIcon}> </sl-icon>

          ${autoupgradeLabel}
        </sl-button>
      </div>

      <div class="buttons desktop">
        <sl-tooltip>
          <span slot="content"> ${COMMON_TEXTS.upgrade()} </span>

          <sl-icon-button
            name=${UPGRADE_MAX_VALUES.icon}
            label=${COMMON_TEXTS.upgrade()}
            @click=${this.handleUpgradeMax}
          >
          </sl-icon-button>
        </sl-tooltip>

        <sl-tooltip>
          <span slot="content"> ${autoupgradeLabel} </span>

          <sl-icon-button name=${autoupgradeIcon} label=${autoupgradeLabel} @click=${this.handleToggleAutoUpgrade}>
          </sl-icon-button>
        </sl-tooltip>
      </div>
    `;
  }

  private handleToggleDescription = () => {
    this._descriptionVisible = !this._descriptionVisible;
  };

  private handleToggleAutoUpgrade = () => {
    const program = this.controller.getProgram(this.programName as ProgramName);

    if (program) {
      program.autoUpgradeEnabled = !program.autoUpgradeEnabled;
    }
  };

  private handleDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.programName);
    }
  };

  private handleUpgradeMax = () => {
    this.controller.upgradeMaxProgram(this.programName as ProgramName);
  };
}
