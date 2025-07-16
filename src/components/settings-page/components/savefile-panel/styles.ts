import { css } from 'lit';

const styles = css`
  :host {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--sl-spacing-large);
  }

  input#import-file {
    display: none;
  }
`;

export default styles;
