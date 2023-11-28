import { css } from '@emotion/react';
import { commonStyles } from '../../../styles/common';

export const styles = {
  container: css`
    ${commonStyles.flex.row}
    label: new-solution-container;

    row-gap: 1rem;
  `,

  header: {
    container: css`
      ${commonStyles.flex.column}
      label: new-solution-header-container;

      column-gap: 1rem;
      align-items: center;
    `,
    input: css`
      label: new solution-header-input;

      box-sizing: border-box;
      min-height: 2rem;
    `,
    name: css`
      label: new-solution-header-name;

      flex-grow: 1;
    `,
    hiddenFile: css`
      label: new-solution-header-hidden;

      display: none;
    `,
  },
};
