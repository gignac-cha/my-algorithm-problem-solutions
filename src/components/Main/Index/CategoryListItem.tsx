import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import { styles } from './styles';

interface CategoryListItem {
  category: CategoryData;
}

export const CategoryListItem: FunctionComponent<
  CategoryListItem & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ category, onClick }) => {
  return (
    <li css={styles.category.container}>
      <button css={styles.category.buttonContainer} onClick={onClick}>
        <span>
          <FontAwesomeIcon icon={faFolder} />
        </span>
        <code>{category.name}</code>
      </button>
    </li>
  );
};
