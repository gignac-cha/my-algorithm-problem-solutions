import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const GitHubSignInLoading = () => {
  return (
    <h2>
      <FontAwesomeIcon icon={faSpinner} spin />
    </h2>
  );
};
