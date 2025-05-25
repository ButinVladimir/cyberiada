import { css } from 'lit';
import { sectionTitleStyle, detailsStyle, hintIconStyle, SCREEN_WIDTH_POINTS } from '@shared/styles';

export const unlockedItemsCategoryStyles = [
  sectionTitleStyle,
  detailsStyle,
  hintIconStyle,
  css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--sl-spacing-large);
    }

    h4.title {
      margin-bottom: 0;
    }

    .content-table {
      display: grid;
      column-gap: var(--sl-spacing-3x-small);
      row-gap: var(--sl-spacing-3x-small);
      grid-template-columns: auto;
      grid-auto-rows: auto;
    }

    .content-table > span:nth-child(even) {
      text-align: start;
      white-space: nowrap;
      margin-bottom: var(--sl-spacing-medium);
    }

    @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
      .content-table {
        grid-template-columns: auto auto;
        row-gap: var(--sl-spacing-small);
      }

      .content-table > span:nth-child(even) {
        text-align: end;
        margin-bottom: 0;
      }
    }
  `,
];
