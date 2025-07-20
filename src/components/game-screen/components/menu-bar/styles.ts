import { css } from 'lit';

const styles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    scrollbar-width: thin;
    overflow: auto;
  }

  aside {
    box-sizing: border-box;
    padding: var(--sl-spacing-large) var(--sl-spacing-2x-small);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  nav {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  sl-divider {
    --spacing: var(--sl-spacing-2x-small);
  }
`;

export default styles;
