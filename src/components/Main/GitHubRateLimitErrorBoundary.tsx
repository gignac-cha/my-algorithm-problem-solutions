/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ErrorInfo, ReactNode, SuspenseProps } from 'react';

interface GitHubRateLimitErrorBoundaryProperties extends SuspenseProps {
  rateLimit: GitHubRateLimit;
}

interface GitHubRateLimitErrorBoundaryState {
  hasError: boolean;
}

export class GitHubRateLimitErrorBoundary extends Component<
  GitHubRateLimitErrorBoundaryProperties,
  GitHubRateLimitErrorBoundaryState
> {
  constructor(props: GitHubRateLimitErrorBoundaryProperties) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ ...this.state, hasError: true });
  }

  componentDidUpdate(
    prevProps: Readonly<GitHubRateLimitErrorBoundaryProperties>,
    prevState: Readonly<GitHubRateLimitErrorBoundaryState>,
    snapshot?: unknown,
  ): void {
    if (prevState.hasError && this.props.rateLimit.remaining > 0) {
      this.setState({ ...prevState, hasError: false });
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
