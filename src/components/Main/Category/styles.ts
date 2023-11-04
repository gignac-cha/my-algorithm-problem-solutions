import { css } from '@emotion/react';
import { commonStyles } from '../../../styles/common';

export const styles = {
  solutions: {
    container: css`
      ${commonStyles.flex.row}
      label: solution-container;

      justify-content: flex-start;
      align-items: center;
      margin: 0;
      padding: 0;
      border-radius: 4px;
      transition: border-color 0.2s;

      @media (prefers-color-scheme: light) {
        border: 1px solid #bbb;
      }
      @media (prefers-color-scheme: dark) {
        border: 1px solid #777;
      }
    `,
  },

  solution: {
    container: css`
      ${commonStyles.flex.row}
      label: solution-list-item-container;

      width: 100%;
      list-style: none;

      &:not(:first-of-type) {
        @media (prefers-color-scheme: light) {
          border-top: 1px solid #bbb;
        }
        @media (prefers-color-scheme: dark) {
          border-top: 1px solid #777;
        }
      }
    `,
    buttonContainer: css`
      ${commonStyles.flex.column}
      ${commonStyles.linkButton}
      label: solution-list-item-button-container;

      column-gap: 1rem;
      justify-content: flex-start;
      align-items: center;
      padding: 1rem;
    `,
    loadingContainer: css`
      ${commonStyles.flex.row}
      label: solution-list-item-loading-container;

      justify-content: center;
      align-items: center;
      padding: 1rem;
    `,
  },
};
