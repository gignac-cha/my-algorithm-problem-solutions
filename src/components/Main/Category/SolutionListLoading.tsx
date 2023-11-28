import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styles } from './styles';

export const SolutionListLoading = () => {
  return (
    <section>
      <ul css={styles.solutions.container}>
        <li css={styles.solution.container}>
          <span css={styles.solution.loadingContainer}>
            <FontAwesomeIcon icon={faSpinner} size="xl" spin />
          </span>
        </li>
      </ul>
    </section>
  );
};
