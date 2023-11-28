import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import { GitHubSignContextProperties } from '../../contexts/GitHubSignContext';
import { styles } from './styles';

interface GitHubSignedOutProperties {
  signIn: GitHubSignContextProperties['signIn'];
}

export const GitHubSignedOut: FunctionComponent<GitHubSignedOutProperties> = ({
  signIn,
}) => {
  return (
    <button css={styles.signedOut.button} onClick={signIn}>
      <FontAwesomeIcon icon={faGithub} /> Sign In with GitHub
    </button>
  );
};
