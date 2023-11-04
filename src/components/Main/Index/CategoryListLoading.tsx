import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styles } from './styles';

export const CategoryListLoading = () => {
  return (
    <section>
      <ul css={styles.categories.container}>
        <li css={styles.category.container}>
          <span css={styles.category.loadingContainer}>
            <FontAwesomeIcon icon={faSpinner} size="xl" spin />
          </span>
        </li>
      </ul>
    </section>
  );
};
