import { css } from 'lit';

const styles = css`
  :host {
    width: 100%;
    align-self: stretch;
    display: block;
    border-top: var(--ca-border);
  }

  .header-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: var(--sl-spacing-medium) 0;
    gap: var(--sl-spacing-small);

    &.with-border {
      border-bottom: var(--ca-border);
    }
  }

  .notification {
    padding: var(--sl-spacing-3x-large);
    text-align: center;
    border-top: var(--ca-border);
    border-bottom: var(--ca-border);
  }

  ca-sortable-list {
    width: 100%;

    &::part(list) {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      gap: var(--sl-spacing-medium);
    }
  }
`;

export default styles;
