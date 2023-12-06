/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ErrorInfo, ReactNode, SuspenseProps } from 'react';
import { UncaughtError } from './UncaughtError';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary<
  P extends SuspenseProps = SuspenseProps,
> extends Component<P, ErrorBoundaryState> {
  constructor(props: P) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ ...this.state, hasError: true, error, errorInfo });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? UncaughtError();
    }
    return this.props.children;
  }
}
