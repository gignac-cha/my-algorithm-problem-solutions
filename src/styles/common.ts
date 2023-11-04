import { css } from '@emotion/react';

const emptyButton = css`
  label: common-empty-button;

  background: none;
  border: none;
  outline: none;
`;

export const commonStyles = {
  flex: {
    row: css`
      label: common-flex-row;

      display: flex;
      flex-direction: column;
    `,
    column: css`
      label: common-flex-column;

      display: flex;
      flex-direction: row;
    `,
  },

  emptyLink: css`
    label: common-empty-link;

    color: inherit;
    text-decoration: none;
  `,

  emptyButton,

  linkButton: css`
    ${emptyButton}
    label: common-link-button;

    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition:
      background-color 0.2s,
      border-color 0.2s;

    &:hover {
      @media (prefers-color-scheme: light) {
        background-color: #eee;
      }
      @media (prefers-color-scheme: dark) {
        background-color: #444;
      }
    }

    &:active {
      @media (prefers-color-scheme: light) {
        background-color: #ddd;
      }
      @media (prefers-color-scheme: dark) {
        background-color: #555;
      }
    }
  `,
};
