/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, SuspenseProps } from 'react';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

interface GitHubRateLimitErrorBoundaryProperties extends SuspenseProps {
  rateLimit: GitHubRateLimit;
}

export class GitHubRateLimitErrorBoundary extends ErrorBoundary<GitHubRateLimitErrorBoundaryProperties> {
  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.rateLimit.remaining === 0) {
        return this.props.fallback;
      }
    }
    return this.props.children;
  }
}
