import { css, unsafeCSS } from 'lit';

export const LAYOUT_WIDTH_THRESHOLDS = {
  TABLET: 768,
  DESKTOP: 1440,
};

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
    line-height: var(--ca-hint-line-height);
  }
`;

export const warningStyle = css`
  p.warning {
    color: var(--ca-warning-color);
    font-size: var(--ca-warning-font-size);
    line-height: var(--ca-warning-line-height);
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

export const subSectionTitleStyle = css`
  h5.title {
    font-size: var(--sl-font-size-normal);
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
    scrollbar-width: thin;
  }
`;

export const detailsStyle = css`
  sl-details::part(base) {
    background-color: var(--sl-panel-background-color);
  }
`;

export const hintIconStyle = css`
  sl-icon[name='question-circle'] {
    position: relative;
    top: 0.25em;
    margin-left: 0.5em;
    color: var(--ca-hint-color);
    font-size: var(--sl-font-size-large);
  }
`;

export const HINT_ICON = 'question-circle';

export const DESCRIPTION_ICONS = {
  hidden: 'chevron-right',
  expanded: 'chevron-down',
};

export const ENTITY_ACTIVE_VALUES: {
  icon: {
    active: string;
    stopped: string;
  };
  buttonVariant: {
    active: 'neutral';
    stopped: 'default';
  };
} = {
  icon: {
    active: 'play-fill',
    stopped: 'pause-fill',
  },
  buttonVariant: {
    active: 'neutral',
    stopped: 'default',
  },
};

export const AUTOUPGRADE_VALUES: {
  icon: {
    enabled: string;
    disabled: string;
  };
  buttonVariant: {
    enabled: 'neutral';
    disabled: 'default';
  };
} = {
  icon: {
    enabled: 'arrow-up-circle-fill',
    disabled: 'arrow-up-circle',
  },
  buttonVariant: {
    enabled: 'neutral',
    disabled: 'default',
  },
};

export const DELETE_VALUES: {
  icon: string;
  buttonVariant: 'danger';
} = {
  icon: 'x-lg',
  buttonVariant: 'danger',
};

export const UPGRADE_MAX_VALUES: {
  icon: string;
  buttonVariant: 'default';
} = {
  icon: 'chevron-double-up',
  buttonVariant: 'default',
};

export const dragIconStyle = css`
  sl-icon[name='grip-vertical'] {
    position: relative;
    top: 0.2em;
    color: var(--ca-hint-color);
    font-size: var(--sl-font-size-large);
  }
`;

export const TOGGLE_DETAILS_VALUES: {
  icon: {
    enabled: string;
    disabled: string;
  };
  buttonVariant: {
    enabled: 'neutral';
    disabled: 'default';
  };
} = {
  icon: {
    enabled: 'eye',
    disabled: 'eye-slash',
  },
  buttonVariant: {
    enabled: 'neutral',
    disabled: 'default',
  },
};

export const attributesSkillsTablesStyle = css`
  div.attributes-skills-tables {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: repeat(auto);
    grid-row-gap: var(--sl-spacing-medium);
    grid-column-gap: var(--sl-spacing-3x-large);
  }

  div.attributes-skills-tables div.attributes-skills-table {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: repeat(auto);
    grid-column-gap: var(--sl-spacing-medium);
    color: var(--ca-hint-color);
    font-size: var(--ca-hint-font-size);
    line-height: var(--ca-hint-line-height);
  }

  div.attributes-skills-tables h5.title {
    margin: 0;
  }

  @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
    div.attributes-skills-tables {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export const highlightedValuesStyle = css`
  .success {
    color: var(--ca-success-color);
  }

  .danger {
    color: var(--ca-danger-color);
  }
`;

export const dialogButtonsStyle = css`
  p.warning {
    display: none;
    margin-top: var(--sl-spacing-3x-small);
    margin-bottom: 0;
  }

  p.warning.visible {
    display: block;
  }

  div.buttons {
    display: flex;
    justify-content: flex-end;
    gap: var(--sl-spacing-medium);
  }
`;

export const progressBarHintStyle = css`
  p.progress-bar-hint {
    color: var(--ca-hint-color);
    font-size: var(--ca-hint-font-size);
    line-height: var(--ca-hint-line-height);
    display: none;
    margin-top: var(--sl-spacing-3x-small);
    margin-bottom: 0;
  }

  p.progress-bar-hint.visible {
    display: block;
  }
`;
