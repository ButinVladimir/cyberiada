import { t } from 'i18next';
import { nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.component.js';
import { BaseComponent } from '@shared/base-component';
import { ToastsController } from './controller';

@customElement('ca-toasts')
export class Toasts extends BaseComponent<ToastsController> {
  @property({ attribute: 'selected-menu-item', type: String })
  selectedMenuItem?: string;

  protected controller: ToastsController;

  constructor() {
    super();

    this.controller = new ToastsController(this);
  }

  renderContent() {
    const toastDuration = this.controller.getToastDuration();
    if (toastDuration === 0) {
      return nothing;
    }

    const toasts = this.controller.getToasts();

    for (const toast of toasts) {
      const parameters = toast.parameters ?? {};

      const alert = Object.assign(document.createElement('sl-alert'), {
        variant: 'primary',
        closable: true,
        duration: toastDuration,
        innerHTML: `
          <sl-icon slot="icon" name="chat-left-dots"></sl-icon>
          ${t(`events:${toast.event}:message`, { ns: 'ui', ...parameters })}
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
