import { css } from '@emotion/react';
import { commonStyles } from '../../styles/common';

export const styles = {
  container: css`
    ${commonStyles.flex.row}
    label: main-container;

    position: relative;
  `,

  header: {
    container: css`
      ${commonStyles.flex.column}
      label: main-header-container;

      position: absolute;
      top: -3rem;
      right: 0;
      justify-content: flex-end;
      align-items: center;
      column-gap: 1rem;
    `,
  },

  rateLimitError: {
    container: css`
      label: main-rate-limit-error-container;

      padding: 1rem;
      border-radius: 4px;
      transition:
        background-color 0.2s,
        border-color 0.2s;

      @media (prefers-color-scheme: light) {
        background-color: #fbb;
        border: 1px solid #f77;
      }
      @media (prefers-color-scheme: dark) {
        background-color: #733;
        border: 1px solid #f77;
      }
    `,
  },
};
