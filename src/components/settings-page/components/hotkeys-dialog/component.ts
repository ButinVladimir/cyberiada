import { html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import { BaseComponent, Hotkey, HOTKEYS } from '@shared/index';
import { COMMON_TEXTS } from '@texts/index';
import { HotkeysDialogCloseEvent } from './events';
import { HotkeysDialogController } from './controller';
import { HOTKEY_NAMES } from './constants';
import styles from './styles';

@localized()
@customElement('ca-hotkeys-dialog')
export class HotkeysDialog extends BaseComponent {
  static styles = styles;

  private _controller: HotkeysDialogController;

  @property({
    attribute: 'open',
    type: Boolean,
  })
  open = false;

  @state()
  private _currentHotkey?: Hotkey;

  constructor() {
    super();

    this._controller = new HotkeysDialogController(this);
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (_changedProperties.has('open')) {
      this._currentHotkey = undefined;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener('keypress', this.handleKeyPress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener('keypress', this.handleKeyPress);
  }

  protected renderDesktop() {
    return html`
      <form id="hotkeys-dialog" @submit=${this.handleSubmit}>
        <sl-dialog ?open=${this.open} @sl-request-close=${this.handleClose}>
          <h4 slot="label" class="title">${msg('Hotkeys')}</h4>

          <div class="body">
            <p class="hint">
              ${msg('Hotkeys for most used actions. Press button on form and then pressed key to assign hotkey.')}
            </p>

            <div>
              <sl-button variant="danger" size="medium" @click=${this.handleClear}> ${msg('Clear hotkeys')} </sl-button>
            </div>

            <sl-divider></sl-divider>

            <div class="hotkey-table">${repeat(HOTKEYS, this.renderHotkeyRow)}</div>
          </div>

          <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
            ${COMMON_TEXTS.close()}
          </sl-button>
        </sl-dialog>
      </form>
    `;
  }

  private renderHotkeyRow = (hotkey: Hotkey) => {
    let buttonText: string;
    let buttonVariant: 'default' | 'primary';

    if (this._currentHotkey === hotkey) {
      buttonText = msg('Press key to assign');
      buttonVariant = 'primary';
    } else {
      buttonText = this._controller.getKeyByHotkey(hotkey)?.toLocaleUpperCase() ?? msg('No button assigned');
      buttonVariant = 'default';
    }

    return html`
      <div>${HOTKEY_NAMES[hotkey]()}</div>
      <div class="hotkey-button-container">
        <sl-button
          size="small"
          variant=${buttonVariant}
          ?outline=${buttonVariant === 'default'}
          value=${hotkey}
          @click=${this.handleStartAssigningHotkey}
        >
          ${buttonText}
        </sl-button>
      </div>
    `;
  };

  private handleClose = () => {
    this.dispatchEvent(new HotkeysDialogCloseEvent());
  };

  private handleClear = () => {
    this._controller.clearHotkeys();
  };

  private handleStartAssigningHotkey = (event: Event) => {
    const target = event.target as SlButton;
    const hotkey = target.value as Hotkey;

    this._currentHotkey = hotkey;
  };

  private handleKeyPress = (event: KeyboardEvent) => {
    if (!this._currentHotkey || !event.key) {
      return;
    }

    const key = event.key;

    this._controller.setHotkey(this._currentHotkey, key);

    this._currentHotkey = undefined;
  };

  private handleSubmit = (event: Event) => {
    event.preventDefault();
  };
}
