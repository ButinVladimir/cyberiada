import { css } from 'lit';
import { pageTitleStyle } from '@shared/index';

const styles = [
    pageTitleStyle,
    css`
      :host {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
      }

      h3.title {
        margin-bottom: var(--sl-spacing-large);
      }

      sl-divider {
        --spacing: var(--sl-spacing-large);
      }
    `,
  ];

  export default styles;