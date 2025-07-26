import { css } from 'lit';

const styles = css`
  :host {
    height: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
  }

  sl-icon-button::part(base) {
    padding: var(--sl-spacing-small);
  }

  div.tooltip-content p {
    margin: 0;
  }
`;

export default styles;
