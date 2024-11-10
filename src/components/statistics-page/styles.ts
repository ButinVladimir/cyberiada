import { css } from 'lit';

export const statisticsPanelStyle = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  }
`;

export const statisticsPanelContentStyle = css`
  :host {
    max-width: var(--ca-viewport-width);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  }

  h4.title {
    font-size: var(--sl-font-size-large);
    font-weight: var(--sl-font-weight-bold);
    margin-top: 0;
    margin-bottom: var(--sl-spacing-2x-small);
    line-height: var(--sl-line-height-normal);
  }

  .parameters-table {
    display: grid;
    column-gap: var(--sl-spacing-3x-small);
    row-gap: var(--sl-spacing-3x-small);
    grid-template-columns: 1fr 0fr;
    grid-auto-rows: auto;
    margin-bottom: var(--sl-spacing-small);
  }

  .parameters-table > span:nth-child(even) {
    text-align: end;
    white-space: nowrap;
  }
`;
