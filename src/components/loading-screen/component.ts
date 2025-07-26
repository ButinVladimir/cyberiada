import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import styles from './styles';

@localized()
@customElement('ca-loading-screen')
export class LoadingScreen extends BaseComponent {
  static styles = styles;

  protected renderDesktop() {
    return html` <span> ${msg('Loading...')} </span> `;
  }
}
