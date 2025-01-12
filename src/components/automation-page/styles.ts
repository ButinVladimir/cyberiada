import { css } from 'lit';
import { hintStyle, sectionTitleStyle, SCREEN_WIDTH_POINTS } from '@shared/styles';

export const autobuyerStyles = [
  hintStyle,
  sectionTitleStyle,
  css`
    :host {
      width: 100%;
      padding: var(--sl-spacing-large);
      box-sizing: border-box;
      border: var(--ca-border);
      border-radius: var(--sl-border-radius-small);
      display: grid;
      grid-template-areas:
        'title'
        'input'
        'hint';
      row-gap: var(--sl-spacing-small);
      column-gap: var(--sl-spacing-small);
    }

    h4.title {
      grid-area: title;
      margin: 0;
    }

    p.hint {
      grid-area: hint;
      margin: 0;
    }

    div.input-container {
      grid-area: input;
      width: 100%;
      display: flex;
    }

    div.input-container sl-input {
      width: 100%;
    }

    @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
      :host {
        grid-template-areas:
          'title input'
          'hint input';
        grid-template-rows: auto auto;
        grid-template-columns: 1fr auto;
      }

      div.input-container {
        grid-area: input;
        width: 15rem;
        align-items: center;
        height: 100%;
      }
    }
  `,
];
