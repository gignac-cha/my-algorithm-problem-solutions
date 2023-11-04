import { css } from '@emotion/react';
import { commonStyles } from '../../styles/common';

export const styles = {
  container: css`
    ${commonStyles.flex.row}
    label: oauth-container;

    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `,
};
