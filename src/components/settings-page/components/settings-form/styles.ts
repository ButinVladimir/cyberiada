import { css } from 'lit';
import { formStyle, inputLabelStyle } from '@shared/styles';

const styles = [
  inputLabelStyle,
  formStyle,
  css`
    :host {
      display: block;
      width: 100%;
    }

    div.spinner-container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--sl-spacing-3x-large);
      font-size: var(--sl-font-size-3x-large);
    }

    div.settings-form {
      width: 100%;
      display: grid;
      grid-template-rows: auto;
      grid-template-rows: auto;
      align-items: flex-start;
      margin-bottom: var(--sl-spacing-large);

      &.mobile {
        row-gap: var(--sl-spacing-2x-large);
        grid-template-columns: 1fr;
      }

      &.desktop {
        row-gap: var(--sl-spacing-large);
        column-gap: var(--sl-spacing-3x-large);
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `,
];

export default styles;
