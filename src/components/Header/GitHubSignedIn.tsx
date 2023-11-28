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
      <button css={commonStyles.emptyInput}>
        <img
          css={styles.signedIn.avatar}
          src={user.avatarURL}
          alt={`${user.name} (${user.id})`}
          title={`${user.name} (${user.id})`}
        />
      </button>
      <span
        css={[
          styles.signedIn.userMenu.container,
          isCollapsed && styles.signedIn.hiddenUserMenuContainer,
        ]}
      >
        <span css={styles.signedIn.userMenu.name}>{user.name}</span>
        <small css={styles.signedIn.userMenu.id}>
          <code>({user.id})</code>
        </small>
        <button
          css={[commonStyles.button, styles.signedIn.button]}
          onClick={signOut}
        >
          Sign Out
        </button>
      </span>
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
