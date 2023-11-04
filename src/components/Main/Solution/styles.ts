import { css } from '@emotion/react';
import { commonStyles } from '../../../styles/common';

export const styles = {
  container: css`
    ${commonStyles.flex.row}
    label: solution-container;
  `,

  viewer: {
    container: css`
      ${commonStyles.flex.row}
      label: solution-viewer-container;

      row-gap: 1rem;
      border-radius: 4px;
      transition: border-color 0.2s;

      @media (prefers-color-scheme: light) {
        border: 1px solid #bbb;
      }
      @media (prefers-color-scheme: dark) {
        border: 1px solid #777;
      }
    `,
    loadingContainer: css`
      ${commonStyles.flex.row}
      label: solution-viewer-loading-container;

      justify-content: center;
      align-items: center;
      padding: 1rem;
    `,
  },
};
