import { css } from '@emotion/react';
import { commonStyles } from '../../styles/common';

export const styles = {
  container: css`
    ${commonStyles.flex.column}
    label: drag-and-drop-zone-container;

    justify-content: center;
    align-items: center;
    column-gap: 0.5rem;
    padding: 1rem;
    min-height: 0;
    border-radius: 0.2rem;
    cursor: pointer;
    transition:
      min-height 0.2s,
      background-color 0.2s,
      border-color 0.2s,
      color 0.2s;

    @media (prefers-color-scheme: light) {
      border: 0.2rem dashed #eee;
      color: #ccc;
    }
    @media (prefers-color-scheme: dark) {
      border: 0.2rem dashed #444;
      color: #777;
    }

    &:hover {
      @media (prefers-color-scheme: light) {
        background-color: #eee;
        border: 0.2rem dashed #ddd;
        color: #777;
      }
      @media (prefers-color-scheme: dark) {
        background-color: #444;
        border: 0.2rem dashed #555;
        color: #bbb;
      }
    }

    &:active {
      @media (prefers-color-scheme: light) {
        background-color: #eee;
        border: 0.2rem dashed #ddd;
        color: #777;
      }
      @media (prefers-color-scheme: dark) {
        background-color: #444;
        border: 0.2rem dashed #555;
        color: #bbb;
      }
    }
  `,
  dragging: css`
    label: drag-and-drop-zone-dragging;

    min-height: 480px;

    @media (prefers-color-scheme: light) {
      background-color: #eee;
      border: 0.2rem dashed #444;
      color: black;
    }
    @media (prefers-color-scheme: dark) {
      background-color: #444;
      border: 0.2rem dashed #eee;
      color: white;
    }
  `,
  error: css`
    label: drag-and-drop-zone-error;

    @media (prefers-color-scheme: light) {
      background-color: #fbb !important;
      border: 0.2rem dashed #f77 !important;
      color: black !important;
    }
    @media (prefers-color-scheme: dark) {
      background-color: #733 !important;
      border: 0.2rem dashed #f77 !important;
      color: white !important;
    }
  `,
};
