/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from 'react';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';

export class CategoryNotFoundErrorBoundary extends ErrorBoundary {
  render(): ReactNode {
    if (this.state.hasError) {
      if (this.state.error?.message.startsWith('Not Found')) {
        return this.props.fallback;
      }
      return super.render();
    }
    return this.props.children;
  }
}
