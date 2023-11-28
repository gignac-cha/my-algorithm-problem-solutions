import { css } from '@emotion/react';

export const styles = {
  container: css`
    label: monaco-editor-container;

    flex-grow: 1;
    transition:
      background-color 0.2s,
      border-color 0.2s,
      filter 0.2s;

    @media (prefers-color-scheme: light) {
      border: 1px solid #ddd;
    }
  `,
  loadingContainer: css`
    label: monaco-editor-loading-container;

    filter: blur(1rem);
  `,
  newContainer: css`
    label: monaco-editor-empty-container;

    min-height: 30rem;
  `,

  placeholder: css`
    label: monaco-editor-placeholder;

    width: max-content;
    font-style: italic;
    opacity: 0.5;
  `,
};
