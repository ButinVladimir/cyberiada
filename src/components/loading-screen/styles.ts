import {  css } from 'lit';

const styles = css`
    :host {
      width: 100vw;
      height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--sl-color-neutral-0);
    }

    span {
      font-size: var(--sl-font-size-3x-large);
      font-weight: var(--sl-font-weight-semibold);
      letter-spacing: var(--sl-letter-spacing-loose);
    }
  `;

  export default styles;