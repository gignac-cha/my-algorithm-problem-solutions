import {
  GitHubSignContextProvider,
  useGitHubSignContext,
} from '../../contexts/GitHubSignContext';
import { GitHubSignedIn } from './GitHubSignedIn';
import { GitHubSignedOut } from './GitHubSignedOut';
import { styles } from './styles';

const Container = () => {
  const { isSigningIn, isSignedIn, signIn, onSignedIn, signOut } =
    useGitHubSignContext();

  return !isSigningIn && !isSignedIn ? (
    <GitHubSignedOut signIn={signIn} />
  ) : (
    <GitHubSignedIn onSignedIn={onSignedIn} signOut={signOut} />
  );
};

export const GitHubSign = () => {
  return (
    <aside css={styles.githubSign.container}>
      <GitHubSignContextProvider>
        <Container />
      </GitHubSignContextProvider>
    </aside>
  );
};
