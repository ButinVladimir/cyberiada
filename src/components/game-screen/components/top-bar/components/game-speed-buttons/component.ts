import { t } from 'i18next';
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GameSpeed } from '@state/general-state/types';
import { GameSpeedButtonsController } from './controller';
import { GameSpeedButtonProps } from './interfaces';

@customElement('ca-game-speed-buttons')
export class GameSpeedButtons extends LitElement {
  static styles = css`
    :host {
      display: flex;
      box-sizing: border-box;
      align-items: center;
    }

    .speed-button-active {
      color: var(--sl-color-primary-600);
    }
  `;

  private _gameSpeedButtonsController: GameSpeedButtonsController;

  constructor() {
    super();

    this._gameSpeedButtonsController = new GameSpeedButtonsController(this);
  }

  render() {
    const gameSpeed = this._gameSpeedButtonsController.gameSpeed;

    return html`
      ${this.renderButton({
        gameSpeed: GameSpeed.paused,
        label: 'pause',
        icon: gameSpeed === GameSpeed.paused ? 'pause-fill' : 'pause',
        className: gameSpeed === GameSpeed.paused ? 'speed-button-active' : '',
      })}
      ${this.renderButton({
        gameSpeed: GameSpeed.normal,
        label: 'playNormal',
        icon: gameSpeed === GameSpeed.normal ? 'play-fill' : 'play',
        className: gameSpeed === GameSpeed.normal ? 'speed-button-active' : '',
      })}
      ${this.renderButton({
        gameSpeed: GameSpeed.fast,
        label: 'playFast',
        icon: gameSpeed === GameSpeed.fast ? 'fast-forward-fill' : 'fast-forward',
        className: gameSpeed === GameSpeed.fast ? 'speed-button-active' : '',
      })}
    `;
  }

  renderButton = (props: GameSpeedButtonProps): TemplateResult => {
    const { label, gameSpeed, icon, className } = props;

    return html`
      <sl-icon-button
        name=${icon}
        class=${className}
        label=${t(`topBar.gameSpeedButtons.${label}`, { ns: 'ui' })}
        @click=${this.handleChangeGameSpeed(gameSpeed)}
      >
      </sl-icon-button>
    `;
  };

  private handleChangeGameSpeed = (gameSpeed: GameSpeed) => (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._gameSpeedButtonsController.changeGameSpeed(gameSpeed);
  };
}
