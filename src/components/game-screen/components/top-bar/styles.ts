import { css } from 'lit';

const styles = css`
  :host {
    display: flex;
    align-items: stretch;
    box-sizing: border-box;
    width: 100%;
    gap: var(--sl-spacing-large);
  }

  .group {
    flex: 0 0 auto;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-denser);
    display: flex;
    align-items: center;
  }

  sl-icon-button::part(base) {
    padding: var(--sl-spacing-small);
  }
`;

export default styles;
