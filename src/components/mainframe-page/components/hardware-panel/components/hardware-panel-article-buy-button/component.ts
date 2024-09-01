import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MainframeHardwarePanelArticleBuyButtonController } from './controller';

@customElement('ca-mainframe-hardware-panel-article-buy-button')
export class MainframeHardwarePanelArticleBuyButton extends LitElement {
  static styles = css``;

  @property({
    attribute: 'cost',
    type: Number,
  })
  cost!: number;

  private _mainframeHardwarePanelArticleBuyButtonController: MainframeHardwarePanelArticleBuyButtonController;

  constructor() {
    super();

    this._mainframeHardwarePanelArticleBuyButtonController = new MainframeHardwarePanelArticleBuyButtonController(this);
  }

  render() {
    const buttonDisabled = this._mainframeHardwarePanelArticleBuyButtonController.money < this.cost;

    return html`
      <sl-button
        variant="primary"
        type="button"
        size="medium"
        ?disabled=${buttonDisabled}
      >
        <slot></slot>
      </sl-button>
    `;
  }

}
