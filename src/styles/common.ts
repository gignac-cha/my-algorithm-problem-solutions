import { css } from '@emotion/react';

const emptyInput = css`
  label: common-empty-input;

  background: none;
  border: none;
  outline: none;
`;

const input = css`
  ${emptyInput}
  label: common-input;

  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  @media (prefers-color-scheme: light) {
    background-color: #eee;
  }
  @media (prefers-color-scheme: dark) {
    background-color: #444;
  }

  &:not(:disabled):hover {
    @media (prefers-color-scheme: light) {
      background-color: #ddd;
    }
    @media (prefers-color-scheme: dark) {
      background-color: #555;
    }
  }

  &:not(:disabled):active,
  &:not(:disabled):focus {
    @media (prefers-color-scheme: light) {
      background-color: #ccc;
    }
    @media (prefers-color-scheme: dark) {
      background-color: #666;
    }
  }
`;

const badge = css`
  label: common-badge;

  padding: 0.2rem 0.5rem;
  border-radius: 4px;

  @media (prefers-color-scheme: light) {
    background-color: #eee;
  }
  @media (prefers-color-scheme: dark) {
    background-color: #444;
  }
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

  emptyInput,

  linkButton: css`
    ${input}
    ${badge}
    label: common-link-button;

    cursor: pointer;
    transition:
      background-color 0.2s,
      border-color 0.2s;

    @media (prefers-color-scheme: light) {
      background: none;
    }
    @media (prefers-color-scheme: dark) {
      background: none;
    }
  `,

  button: css`
    ${input}
    label: common-button;
  `,

  input,

  badge,
  errorBadge: css`
    label: common-error-badge;

    background-color: #f77 !important;
  `,

  select: css`
    ${input}
    label: common-select;
  `,

  error: {
    container: css`
      label: common-error-container;

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
