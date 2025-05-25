import { css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle, SCREEN_WIDTH_POINTS } from '@shared/styles';
import { ProcessesPanelController } from './controller';
import { COMMON_TEXTS } from '@/texts';

@localized()
@customElement('ca-mainframe-processes-panel')
export class MainframeProcessesPanel extends BaseComponent {
  static styles = [
    hintStyle,
    css`
      :host {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
      }

      p.hint {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-large);
      }

      div.top-container {
        display: grid;
        grid-template-areas:
          'ram'
          'cores'
          'start-process';
        gap: var(--sl-spacing-medium);
      }

      .start-process {
        grid-area: start-process;
      }

      .cores {
        grid-area: cores;
      }

      .ram {
        grid-area: ram;
      }

      ca-processes-list {
        margin-top: var(--sl-spacing-large);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        div.top-container {
          grid-template-areas: 'start-process ram cores';
          align-items: center;
          gap: var(--sl-spacing-3x-large);
        }
      }
    `,
  ];

  private _controller: ProcessesPanelController;

  @state()
  private _isStartProcessDialogOpen = false;

  constructor() {
    super();

    this._controller = new ProcessesPanelController(this);
  }

  render() {
    const formatter = this._controller.formatter;

    const formattedAvailableRam = formatter.formatNumberDecimal(this._controller.availableRam);
    const formattedMaxRam = formatter.formatNumberDecimal(this._controller.maxRam);

    const formattedAvailableCores = formatter.formatNumberDecimal(this._controller.availableCores);
    const formattedMaxCores = formatter.formatNumberDecimal(this._controller.maxCores);

    return html`
      <p class="hint">
        ${msg(`To make a program run, a process has to be start for it.
Topmost processes for non-autoscalable programs have more priority when cores are assigned to processes.
Process for autoscalable program has cores and RAM assigned last.
Only one process for autoscalable program can run at same time.
Process minimal completion time is limited.
Processes can be rearranged by dragging them by their title.`)}
      </p>

      <div class="top-container">
        <sl-button class="start-process" variant="primary" size="medium" @click=${this.handleStartProcessDialogOpen}>
          ${msg('Start process')}
        </sl-button>

        <div class="ram">
          ${COMMON_TEXTS.parameterValue(msg('Available RAM'), `${formattedAvailableRam} / ${formattedMaxRam}`)}
        </div>

        <div class="cores">
          ${COMMON_TEXTS.parameterValue(msg('Available cores'), `${formattedAvailableCores} / ${formattedMaxCores}`)}
        </div>
      </div>

      <ca-processes-list></ca-processes-list>

      <ca-start-process-dialog
        ?is-open=${this._isStartProcessDialogOpen}
        @start-process-dialog-close=${this.handleStartProcessDialogClose}
      >
      </ca-start-process-dialog>
    `;
  }

  private handleStartProcessDialogOpen = () => {
    this._isStartProcessDialogOpen = true;
  };

  private handleStartProcessDialogClose = () => {
    this._isStartProcessDialogOpen = false;
  };
}
