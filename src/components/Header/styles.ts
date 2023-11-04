import { css } from '@emotion/react';
import { commonStyles } from '../../styles/common';

export const styles = {
  container: css`
    ${commonStyles.flex.column}
    label: header-container;

    justify-content: space-between;
    align-items: center;
  `,

  githubSign: {
    container: css`
      label: github-sign-container;

      display: flex;
    `,
  },

  signedIn: {
    container: css`
      ${commonStyles.flex.column}
      label: signed-in-container;

      column-gap: 1rem;
      justify-content: center;
      align-items: center;
    `,
    userContainer: css`
      ${commonStyles.flex.column}
      label: signed-in-user-container;

      column-gap: 0.5rem;
      justify-content: center;
      align-items: center;
    `,
    avatar: css`
      label: signed-in-avatar;

      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    `,
    userMenuContainer: css`
      ${commonStyles.flex.column}
      label: signed-in-user-menu-container;

      column-gap: 0.5rem;
      justify-content: center;
      align-items: center;
    `,
    hiddenUserMenuContainer: css`
      display: none;
    `,
    button: css`
      ${commonStyles.flex.column}
      label: signed-in-button;

      column-gap: 0.5rem;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    `,
  },

  signedOut: {
    button: css`
      ${commonStyles.flex.column}
      ${commonStyles.linkButton}
      label: signed-out-button;

      column-gap: 0.5rem;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    `,
  },
};
