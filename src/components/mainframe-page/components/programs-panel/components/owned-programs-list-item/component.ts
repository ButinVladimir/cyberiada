import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseComponent } from '@shared/base-component';
import { OtherProgramName, ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { SCREEN_WIDTH_POINTS, hintIconStyle } from '@shared/styles';
import { OwnedProgramsListItemController } from './controller';

@customElement('ca-owned-programs-list-item')
export class OwnedProgramsListItem extends BaseComponent<OwnedProgramsListItemController> {
  static styles = [
    hintIconStyle,
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

      sl-icon[name='grip-vertical'] {
        position: relative;
        top: 0.2em;
        color: var(--ca-hint-color);
        font-size: var(--sl-font-size-large);
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
  programName: string = OtherProgramName.shareServer;

  @state()
  _descriptionVisible = false;

  protected controller: OwnedProgramsListItemController;

  constructor() {
    super();

    this.controller = new OwnedProgramsListItemController(this);
  }

  render() {
    const formatter = this.controller.formatter;

    const program = this.controller.getProgram(this.programName as ProgramName);

    if (!program) {
      return nothing;
    }

    const descriptionButtonName = this._descriptionVisible ? 'chevron-down' : 'chevron-right';
    const descriptionButtonLabel = this._descriptionVisible ? 'hideDescription' : 'showDescription';
    const descriptionClasses = classMap({
      'program-description': true,
      visible: this._descriptionVisible,
    });

    const autoupgradeIcon = program.autoUpgradeEnabled ? 'arrow-up-circle-fill' : 'arrow-up-circle';
    const autoupgradeLabel = program.autoUpgradeEnabled ? 'disableAutoupgrade' : 'enableAutoupgrade';
    const autoupgradeVariant = program.autoUpgradeEnabled ? 'neutral' : 'default';

    const formattedLevel = formatter.formatNumberDecimal(program.level);
    const formattedQuality = formatter.formatQuality(program.quality);

    return html`
      <div class="program">
        <div class="program-title" draggable="true" @dragstart=${this.handleDragStart}>
          <sl-icon name="grip-vertical"> </sl-icon>

          ${t(`${program.name}.name`, { ns: 'programs' })}

          <sl-tooltip>
            <span slot="content">${t(`mainframe.hints.${descriptionButtonLabel}`, { ns: 'ui' })}</span>

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

      <div class="mobile">${t(`mainframe.programs.level`, { ns: 'ui', level: formattedLevel })}</div>

      <div class="desktop">${formattedLevel}</div>

      <div class="mobile">${t(`mainframe.programs.quality`, { ns: 'ui', quality: formattedQuality })}</div>

      <div class="desktop">${formattedQuality}</div>

      <div class="buttons mobile">
        <sl-button variant="default" size="medium" @click=${this.handleUpgradeMax}>
          ${t('common.upgrade', { ns: 'ui' })}
        </sl-button>

        <sl-button variant=${autoupgradeVariant} size="medium" @click=${this.handleToggleAutoUpgrade}>
          ${t(`mainframe.programs.${autoupgradeLabel}`, { ns: 'ui' })}
        </sl-button>
      </div>

      <div class="buttons desktop">
        <sl-tooltip>
          <span slot="content"> ${t('common.upgrade', { ns: 'ui' })} </span>

          <sl-icon-button
            name="chevron-double-up"
            label=${t('common.upgrade', { ns: 'ui' })}
            @click=${this.handleUpgradeMax}
          >
          </sl-icon-button>
        </sl-tooltip>

        <sl-tooltip>
          <span slot="content"> ${t(`mainframe.programs.${autoupgradeLabel}`, { ns: 'ui' })} </span>

          <sl-icon-button
            name=${autoupgradeIcon}
            label=${t(`mainframe.programs.${autoupgradeLabel}`, { ns: 'ui' })}
            @click=${this.handleToggleAutoUpgrade}
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

  private handleToggleAutoUpgrade = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

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

  private handleUpgradeMax = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    this.controller.upgradeMaxProgram(this.programName as ProgramName);
  };
}
