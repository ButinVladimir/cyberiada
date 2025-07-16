import { css } from 'lit';

const styles = css`
  :host {
    display: block;
  }

  div.buttons-list {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--sl-spacing-large);
  }
`;

export default styles;
