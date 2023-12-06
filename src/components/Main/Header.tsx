import { faEdit, faFile, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCategoriesQuery } from '../../queries/useCategoryQuery';
import { useGitHubUserQuery } from '../../queries/useGitHubQuery';
import { commonStyles } from '../../styles/common';
import { styles } from './styles';

export const Header = () => {
  const { data: user } = useGitHubUserQuery();
  const { data: categories } = useCategoriesQuery();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [categoryName, solutionName, isNew, isEdit] = useMemo(
    () => [
      searchParams.get('category'),
      searchParams.get('solution'),
      searchParams.has('new'),
      searchParams.has('edit'),
    ],
    [searchParams],
  );

  const onNewSolutionClick = useCallback(() => {
    if (categoryName) {
      searchParams.set('category', categoryName);
    } else {
      searchParams.set(
        'category',
        categories.at(0)?.name ?? 'INVALID_CATEGORY',
      );
    }
    searchParams.delete('solution');
    searchParams.set('new', '');
    setSearchParams(searchParams);
  }, [categories, categoryName, searchParams, setSearchParams]);
  const onNewSolutionCancelClick = useCallback(() => navigate(-1), [navigate]);
  const onEditSolutionClick = useCallback(() => {
    if (categoryName && solutionName) {
      searchParams.set('category', categoryName);
      searchParams.set('solution', solutionName);
      searchParams.set('edit', '');
      setSearchParams(searchParams);
    }
  }, [categoryName, searchParams, setSearchParams, solutionName]);

  return (
    user.id === import.meta.env.VITE_GITHUB_OWNER && (
      <header css={styles.header.container}>
        {solutionName && isEdit && (
          <button css={commonStyles.button} onClick={onEditSolutionClick}>
            <FontAwesomeIcon icon={faEdit} /> Edit Solution
          </button>
        )}
        {isNew ? (
          <button css={commonStyles.button} onClick={onNewSolutionCancelClick}>
            <FontAwesomeIcon icon={faX} /> Cancel
          </button>
        ) : (
          <button css={commonStyles.button} onClick={onNewSolutionClick}>
            <FontAwesomeIcon icon={faFile} /> New Solution
          </button>
        )}
      </header>
    )
  );
};
