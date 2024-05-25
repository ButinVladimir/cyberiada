import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ca-game-screen')
export class GameScreen extends LitElement {
  render() {
    return html`
      <ca-top-bar></ca-top-bar>
      <ca-viewport>
        <ca-side-bar slot="side-bar"></ca-side-bar>
        Reeeeeeeee
      </ca-viewport>
    `;
  }
}
