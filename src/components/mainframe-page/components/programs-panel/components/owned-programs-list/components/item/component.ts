import { css, html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { provide } from '@lit/context';
import { BaseComponent } from '@shared/base-component';
import { type ProgramName, type IProgram } from '@state/mainframe-state/states';
import {
  AUTOUPGRADE_VALUES,
  DESCRIPTION_ICONS,
  SCREEN_WIDTH_POINTS,
  UPGRADE_MAX_VALUES,
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

    const autoupgradeIcon = this._program.autoUpgradeEnabled
      ? AUTOUPGRADE_VALUES.icon.enabled
      : AUTOUPGRADE_VALUES.icon.disabled;
    const autoupgradeLabel = this._program.autoUpgradeEnabled
      ? COMMON_TEXTS.disableAutoupgrade()
      : COMMON_TEXTS.enableAutoupgrade();
    const autoupgradeVariant = this._program.autoUpgradeEnabled
      ? AUTOUPGRADE_VALUES.buttonVariant.enabled
      : AUTOUPGRADE_VALUES.buttonVariant.disabled;

    const programTitle = PROGRAM_TEXTS[this.programName].title();
    const formattedLevel = formatter.formatLevel(this._program.level);
    const formattedQuality = formatter.formatQuality(this._program.quality);

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

  private handleToggleAutoUpgrade = () => {
    if (this._program) {
      this._program.autoUpgradeEnabled = !this._program.autoUpgradeEnabled;
    }
  };

  private handleDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.programName);
    }
  };

  private handleUpgradeMax = () => {
    this._controller.upgradeMaxProgram(this.programName as ProgramName);
  };
}
