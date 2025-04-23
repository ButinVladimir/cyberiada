import { css } from 'lit';

export const cloneStatsBlockStyle = css`
  :host {
    display: block;
  }

  h5.title {
    margin: 0;
  }

  h5.title sl-icon-button.toggle-stats-button {
    position: relative;
    top: 0.25rem;
  }

  div.table {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
    grid-column-gap: var(--sl-spacing-medium);
    color: var(--ca-hint-color);
    font-size: var(--ca-hint-font-size);
    line-height: var(--ca-hint-line-height);
  }
`;
