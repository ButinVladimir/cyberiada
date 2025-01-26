import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { SCREEN_WIDTH_POINTS } from '@shared/styles';
import { ProcessesPanelController } from './controller';
import { OverviewMenuItem } from '@shared/types';
import { IHistoryState } from '@shared/interfaces/history-state';
import { IMainframePageHistoryState } from '../../interfaces';

@customElement('ca-mainframe-processes-panel')
export class MainframeProcessesPanel extends BaseComponent<ProcessesPanelController> {
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
          'cores'
          'ram'
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
          grid-template-areas: 'start-process cores ram';
          align-items: center;
          gap: var(--sl-spacing-3x-large);
        }
      }
    `,
  ];

  protected controller: ProcessesPanelController;

  @state()
  private _isStartProcessDialogOpen = false;

  constructor() {
    super();

    this.controller = new ProcessesPanelController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('popstate', this.handlePopState);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('popstate', this.handlePopState);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    return html`
      <p class="hint">${t('mainframe.processes.processesHint', { ns: 'ui' })}</p>

      <div class="top-container">
        <sl-button class="start-process" variant="primary" size="medium" @click=${this.handleStartProcessDialogOpen}>
          ${t('mainframe.processes.startProcess', { ns: 'ui' })}
        </sl-button>

        <div class="cores">
          ${t('mainframe.processes.availableCores', {
            ns: 'ui',
            cores: formatter.formatNumberDecimal(this.controller.availableCores),
          })}
        </div>

        <div class="ram">
          ${t('mainframe.processes.availableRam', {
            ns: 'ui',
            ram: formatter.formatNumberDecimal(this.controller.availableRam),
          })}
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

  private handleStartProcessDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isStartProcessDialogOpen = true;

    const state = { ...window.history.state, startProcessModalOpen: true } as IMainframePageHistoryState;
    window.history.pushState(state, OverviewMenuItem.mainframe);
  };

  private handleStartProcessDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    window.history.back();
  };

  private handlePopState = (event: PopStateEvent) => {
    if ((event.state as IHistoryState).selectedMenuItem === OverviewMenuItem.mainframe) {
      const state = event.state as IMainframePageHistoryState;

      this._isStartProcessDialogOpen = !!state.startProcessModalOpen;
    }
  };
}
