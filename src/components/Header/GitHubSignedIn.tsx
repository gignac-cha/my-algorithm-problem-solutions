import { FunctionComponent, Suspense, useEffect, useState } from 'react';
import { GitHubSignContextProperties } from '../../contexts/GitHubSignContext';
import { useGitHubUserQuery } from '../../queries/useGitHubQuery';
import { commonStyles } from '../../styles/common';
import { GitHubSignInErrorBoundary } from './GitHubSignInErrorBoundary';
import { GitHubSignInLoading } from './GitHubSignInLoading';
import { styles } from './styles';

interface GitHubSignedInProperties {
  onSignedIn: GitHubSignContextProperties['onSignedIn'];
  signOut: GitHubSignContextProperties['signOut'];
}

const Container: FunctionComponent<GitHubSignedInProperties> = ({
  onSignedIn,
  signOut,
}) => {
  const { data: user } = useGitHubUserQuery();

  useEffect(() => {
    onSignedIn();
  }, [onSignedIn]);

  const [isCollapsed, setCollpased] = useState(
    window.innerWidth < window.innerHeight,
  );

  useEffect(() => {
    const onResize = () => setCollpased(window.innerWidth < window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section css={styles.signedIn.container}>
      <h2 css={styles.signedIn.userContainer}>
        <button css={commonStyles.emptyButton}>
          <img
            css={styles.signedIn.avatar}
            src={user.avatarURL}
            alt={`${user.name} (${user.id})`}
            title={`${user.name} (${user.id})`}
          />
        </button>
        <section
          css={[
            styles.signedIn.userMenuContainer,
            isCollapsed && styles.signedIn.hiddenUserMenuContainer,
          ]}
        >
          <span>{user.name}</span>
          <span>
            <small>({user.id})</small>
          </span>
          <button
            css={[commonStyles.linkButton, styles.signedIn.button]}
            onClick={signOut}
          >
            Sign Out
          </button>
        </section>
      </h2>
    </section>
  );
};

export const GitHubSignedIn: FunctionComponent<GitHubSignedInProperties> = ({
  onSignedIn,
  signOut,
}) => {
  return (
    <GitHubSignInErrorBoundary onError={signOut}>
      <Suspense fallback={<GitHubSignInLoading />}>
        <Container onSignedIn={onSignedIn} signOut={signOut} />
      </Suspense>
    </GitHubSignInErrorBoundary>
  );
};
