import { css } from 'lit';
import {
  inputLabelStyle,
  hintStyle,
  sectionTitleStyle,
  mediumModalStyle,
  modalBodyScrollStyle,
  formStyle,
} from '@shared/index';

const styles = [
  inputLabelStyle,
  hintStyle,
  sectionTitleStyle,
  mediumModalStyle,
  modalBodyScrollStyle,
  formStyle,
  css`
    sl-dialog::part(body) {
      padding-top: 0;
      padding-bottom: 0;
    }

    sl-dialog::part(footer) {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: var(--sl-spacing-small);
    }

    :host {
      display: contents;
    }

    h4.title {
      margin: 0;
    }

    div.body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    div.inputs-container {
      display: grid;
      column-gap: var(--sl-spacing-medium);
      row-gap: var(--sl-spacing-medium);
      margin-bottom: var(--sl-spacing-medium);

      &.mobile {
        grid-template-columns: auto;
        grid-template-rows: auto;
      }

      &.desktop {
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
      }
    }

    p.hint {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-medium);
    }

    div.footer {
      display: flex;
    }
  `,
];

export default styles;
