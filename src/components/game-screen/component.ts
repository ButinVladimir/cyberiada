import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('game-screen')
export class GameScreen extends LitElement {
  render() {
    return html`
      <top-bar></top-bar>
    `;
  }
}
