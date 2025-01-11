import { css } from 'lit';

export const statisticsPanelStyle = css`
  :host {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  }
`;

export const statisticsPanelContentStyle = css`
  :host {
    display: block;
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
    grid-template-columns: auto auto;
    grid-auto-rows: auto;
    margin-bottom: var(--sl-spacing-small);
  }

  .parameters-table > span:nth-child(even) {
    text-align: end;
    white-space: nowrap;
  }

  sl-icon[name='question-circle'] {
    position: relative;
    top: 0.25em;
    margin-left: 0.5em;
    color: var(--ca-hint-color);
    font-size: var(--sl-font-size-large);
  }
`;
