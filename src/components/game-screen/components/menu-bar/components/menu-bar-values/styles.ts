import { css } from 'lit';

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  div.block {
    display: flex;
    align-items: center;
    padding: var(--sl-spacing-small);
    font-size: var(--sl-font-size-medium);
    line-height: var(--sl-line-height-normal);
  }

  sl-icon {
    color: var(--ca-hint-color);
    width: 1rem;
    font-size: var(--sl-font-size-medium);
    margin-right: var(--sl-spacing-small);
  }
`;

export default styles;
