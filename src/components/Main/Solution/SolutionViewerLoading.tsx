import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styles } from './styles';

export const SolutionViewerLoading = () => {
  return (
    <section css={styles.viewer.container}>
      <span css={styles.viewer.loadingContainer}>
        <FontAwesomeIcon icon={faSpinner} size="xl" spin />
      </span>
    </section>
  );
};
