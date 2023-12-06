import { ReactNode, SuspenseProps } from 'react';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

interface GitHubSignInErrorBoundaryProperties extends SuspenseProps {
  onError: () => void;
}

export class GitHubSignInErrorBoundary extends ErrorBoundary<GitHubSignInErrorBoundaryProperties> {
  render(): ReactNode {
    if (this.state.hasError) {
      if (this.state.error?.message.startsWith('Bad credentials')) {
        this.props.onError();
        return this.props.fallback;
      } else if (this.state.error?.message.startsWith('Invalid access token')) {
        this.props.onError();
        return this.props.fallback;
      }
    }
    return this.props.children;
  }
}
