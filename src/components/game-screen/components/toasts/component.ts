import { nothing } from 'lit';
import { localized } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.component.js';
import { BaseComponent } from '@shared/base-component';
import { ToastsController } from './controller';

@localized()
@customElement('ca-toasts')
export class Toasts extends BaseComponent {
  @property({ attribute: 'selected-menu-item', type: String })
  selectedMenuItem?: string;

  private _controller: ToastsController;

  constructor() {
    super();

    this._controller = new ToastsController(this);
  }

  protected renderDesktop() {
    const toastDuration = this._controller.getToastDuration();

    const toasts = this._controller.getToasts();

    for (const toast of toasts) {
      const alert = Object.assign(document.createElement('sl-alert'), {
        variant: 'primary',
        closable: true,
        duration: toastDuration,
        innerHTML: `
          <sl-icon slot="icon" name="chat-left-dots"></sl-icon>
          ${toast.messageText}
        `,
      });

      document.body.append(alert);

      (alert as SlAlert).toast().catch((e) => {
        console.error(e);
      });
    }

    return nothing;
  }
}
