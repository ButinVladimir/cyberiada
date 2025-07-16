import { css } from 'lit';

const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  button {
    display: flex;
    padding: var(--sl-spacing-small);
    width: 100%;
    box-sizing: border-box;
    background: none;
    border: 0 solid var(--sl-color-primary-600);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-950);
    white-space: nowrap;
    text-decoration: none;

    transition:
      border-left-width var(--sl-transition-x-fast) ease,
      background-color var(--sl-transition-x-fast) ease;

    &:hover {
      background-color: var(--sl-panel-background-color);
      cursor: pointer;
    }

    &.selected {
      background-color: var(--sl-panel-background-color);
      border-left-width: var(--sl-spacing-2x-small);
      font-weight: var(--sl-font-weight-bold);
    }
  }
`;

export default styles;
