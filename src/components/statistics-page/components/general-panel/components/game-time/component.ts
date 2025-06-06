import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsGameTimeController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-game-time')
export class StatisticsGameTime extends BaseComponent {
  static styles = statisticsPanelContentStyle;

  hasPartialUpdate = true;

  private _controller: StatisticsGameTimeController;

  private _gameTimeRef = createRef<HTMLSpanElement>();
  private _gameTotalTimeRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this._controller = new StatisticsGameTimeController(this);
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('In-game passed time')}</h4>

        <div class="parameters-table">
          <span> ${msg('Since arrival to the city')} </span>
          <span ${ref(this._gameTimeRef)}> </span>

          <span> ${msg('Total time')} </span>
          <span ${ref(this._gameTotalTimeRef)}> </span>
        </div>
      </sl-details>
    `;
  }

  handlePartialUpdate = () => {
    const formatter = this._controller.formatter;

    if (this._gameTimeRef.value) {
      this._gameTimeRef.value.textContent = formatter.formatTimeShort(this._controller.gameTime);
    }

    if (this._gameTotalTimeRef.value) {
      this._gameTotalTimeRef.value.textContent = formatter.formatTimeShort(this._controller.gameTimeTotal);
    }
  };
}
