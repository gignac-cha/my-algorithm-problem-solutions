import { css } from '@emotion/react';
import { commonStyles } from '../../styles/common';

export const styles = {
  container: css`
    ${commonStyles.flex.column}
    label: navigator-container;

    column-gap: 0.5rem;
    justify-content: flex-start;
    align-items: center;
  `,

  breadcrumb: {
    text: css`
      label: breadcrumb-text;

      padding: 0.2rem 0.5rem;
    `,
  },
};
