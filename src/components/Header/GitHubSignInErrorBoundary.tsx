import { Component, ErrorInfo, ReactNode, SuspenseProps } from 'react';

interface GitHubSignInErrorBoundaryProperties extends SuspenseProps {
  onError: () => void;
}

interface GitHubSignInErrorBoundaryState {
  hasError: boolean;
}

export class GitHubSignInErrorBoundary extends Component<
  GitHubSignInErrorBoundaryProperties,
  GitHubSignInErrorBoundaryState
> {
  constructor(props: GitHubSignInErrorBoundaryProperties) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (error.message === 'Bad credentials') {
      this.props.onError();
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
