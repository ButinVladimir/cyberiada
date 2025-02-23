import { css, unsafeCSS } from 'lit';

export const SCREEN_WIDTH_POINTS = {
  TABLET: unsafeCSS`768px`,
  WIDE_SCREEN: unsafeCSS`1440px`,
};

export const pageTitleStyle = css`
  h3.title {
    font-size: var(--sl-font-size-2x-large);
    font-weight: var(--sl-font-weight-bold);
    margin-top: 0;
    line-height: var(--sl-line-height-denser);
  }
`;

export const inputLabelStyle = css`
  span.input-label {
    font-size: var(--sl-font-size-small);
    line-height: var(--sl-line-height-dense);
  }
`;

export const hintStyle = css`
  p.hint {
    color: var(--ca-hint-color);
    font-size: var(--ca-hint-font-size);
  }
`;

export const sectionTitleStyle = css`
  h4.title {
    font-size: var(--sl-font-size-large);
    font-weight: var(--sl-font-weight-bold);
    margin-top: 0;
    line-height: var(--sl-line-height-normal);
  }
`;

export const smallModalStyle = css`
  sl-dialog {
    --width: 600px;
  }
`;

export const mediumModalStyle = css`
  sl-dialog {
    --width: 900px;
  }
`;

export const modalBodyScrollStyle = css`
  sl-dialog::part(body) {
    scrollbar-gutter: stable;
    scrollbar-width: thin;
  }
`;
