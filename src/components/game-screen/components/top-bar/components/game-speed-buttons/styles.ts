import { css } from 'lit';

const styles = css`
    :host {
      height: 100%;
      display: flex;
      box-sizing: border-box;
      align-items: center;
    }

    sl-icon-button::part(base) {
      padding: var(--sl-spacing-small);
    }
  `;

  export default styles;