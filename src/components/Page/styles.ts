import { css } from '@emotion/react';
import { commonStyles } from '../../styles/common';

export const styles = {
  container: css`
    ${commonStyles.flex.row}
    label: page-container;

    row-gap: 1rem;
    margin: auto;

    @media (max-width: 30rem) {
      width: 100%;
    }
    @media (min-width: 30rem) and (max-width: 60rem) {
      width: 30rem;
    }
    @media (min-width: 60rem) and (max-width: 90rem) {
      width: 60rem;
    }
    @media (min-width: 90rem) {
      width: 90rem;
    }
  `,
};
