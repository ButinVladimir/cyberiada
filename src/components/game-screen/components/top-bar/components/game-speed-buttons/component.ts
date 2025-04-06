import { html, css, TemplateResult } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { GameSpeed } from '@state/global-state/types';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { GameStateAlert } from '@shared/types';
import { GAME_SPEED_TEXTS } from '@texts/game-speed';
import { GameSpeedButtonsController } from './controller';
import { GameSpeedButtonProps } from './interfaces';

@localized()
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

  render() {
    const gameSpeed = this.controller.gameSpeed;

    return html`
      ${this.renderButton({
        gameSpeed: GameSpeed.paused,
        icon: gameSpeed === GameSpeed.paused ? 'pause-fill' : 'pause',
      })}
      ${this.renderButton({
        gameSpeed: GameSpeed.normal,
        icon: gameSpeed === GameSpeed.normal ? 'play-fill' : 'play',
      })}
      ${this.renderButton({
        gameSpeed: GameSpeed.fast,
        icon: gameSpeed === GameSpeed.fast ? 'fast-forward-fill' : 'fast-forward',
      })}
      <sl-tooltip>
        <span slot="content"> ${msg('Spend all accumulated time')} </span>

        <sl-icon-button
          name="skip-end"
          label=${msg('Spend all accumulated time')}
          @click=${this.handleOpenFastForwardDialog}
        >
        </sl-icon-button>
      </sl-tooltip>
    `;
  }

  renderButton = (props: GameSpeedButtonProps): TemplateResult => {
    const { gameSpeed, icon } = props;

    return html`
      <sl-tooltip>
        <span slot="content"> ${GAME_SPEED_TEXTS[gameSpeed]()} </span>

        <sl-icon-button
          name=${icon}
          label=${GAME_SPEED_TEXTS[gameSpeed]()}
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
