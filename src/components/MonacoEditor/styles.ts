import { css } from '@emotion/react';

export const styles = {
  container: css`
    label: monaco-editor-container;

    transition: filter 0.2s;
  `,
  loadingContainer: css`
    filter: blur(1rem);
  `,
};
