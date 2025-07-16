import { css } from 'lit';

const styles = css`
  :host {
    display: block;
  }

  div.content-wrapper {
    width: 100%;
    max-width: var(--ca-width-widescreen-content);
    padding: var(--sl-spacing-2x-large);
    box-sizing: border-box;
  }
`;

export default styles;
