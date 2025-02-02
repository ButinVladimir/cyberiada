import { t } from 'i18next';
import { html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { GameSpeed } from '@state/global-state/types';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { GameStateAlert } from '@shared/types';
import { GameSpeedButtonsController } from './controller';
import { GameSpeedButtonProps } from './interfaces';

@customElement('ca-game-speed-buttons')
export class GameSpeedButtons extends BaseComponent<GameSpeedButtonsController> {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      box-sizing: border-box;
      align-items: center;
    }

    sl-icon-button::part(base) {
      padding: var(--sl-spacing-small);
    }
  `;

  protected controller: GameSpeedButtonsController;

  constructor() {
    super();

    this.controller = new GameSpeedButtonsController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmFastForwardDialog);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmFastForwardDialog);
  }

  renderContent() {
    const gameSpeed = this.controller.gameSpeed;

    return html`
      ${this.renderButton({
        gameSpeed: GameSpeed.paused,
        label: 'pause',
        icon: gameSpeed === GameSpeed.paused ? 'pause-fill' : 'pause',
      })}
      ${this.renderButton({
        gameSpeed: GameSpeed.normal,
        label: 'playNormal',
        icon: gameSpeed === GameSpeed.normal ? 'play-fill' : 'play',
      })}
      ${this.renderButton({
        gameSpeed: GameSpeed.fast,
        label: 'playFast',
        icon: gameSpeed === GameSpeed.fast ? 'fast-forward-fill' : 'fast-forward',
      })}
      <sl-tooltip>
        <span slot="content"> ${t('topBar.gameSpeedButtons.fastForward', { ns: 'ui' })} </span>

        <sl-icon-button
          name="skip-end"
          label=${t(`topBar.gameSpeedButtons.fastForward`, { ns: 'ui' })}
          @click=${this.handleOpenFastForwardDialog}
        >
        </sl-icon-button>
      </sl-tooltip>
    `;
  }

  renderButton = (props: GameSpeedButtonProps): TemplateResult => {
    const { label, gameSpeed, icon } = props;

    return html`
      <sl-tooltip>
        <span slot="content"> ${t(`topBar.gameSpeedButtons.${label}`, { ns: 'ui' })} </span>

        <sl-icon-button
          name=${icon}
          label=${t(`topBar.gameSpeedButtons.${label}`, { ns: 'ui' })}
          @click=${this.handleChangeGameSpeed(gameSpeed)}
        >
        </sl-icon-button>
      </sl-tooltip>
    `;
  };

  private handleChangeGameSpeed = (gameSpeed: GameSpeed) => (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.controller.changeGameSpeed(gameSpeed);
  };

  private handleOpenFastForwardDialog = (event: Event) => {
    event.stopPropagation();

    this.dispatchEvent(new ConfirmationAlertOpenEvent(GameStateAlert.fastForward, {}));
  };

  private handleConfirmFastForwardDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== GameStateAlert.fastForward) {
      return;
    }

    this.controller.fastForward();
  };
}
