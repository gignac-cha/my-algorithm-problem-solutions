import { faEdit, faFile, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGitHubUserQuery } from '../../queries/useGitHubQuery';
import { commonStyles } from '../../styles/common';
import { styles } from './styles';

export const Header = () => {
  const { data: user } = useGitHubUserQuery();

  const { categoryName, solutionName } = useParams<RouterParameters>();

  const navigate = useNavigate();

  const onNewSolutionClick = useCallback(
    () => navigate(`/${categoryName}/new`),
    [categoryName, navigate],
  );
  const onNewSolutionCancelClick = useCallback(() => navigate(-1), [navigate]);
  const onEditSolutionClick = useCallback(
    () => navigate(`/${categoryName}/${solutionName}/edit`),
    [categoryName, navigate, solutionName],
  );

  return (
    user.id === import.meta.env.VITE_GITHUB_OWNER && (
      <header css={styles.header.container}>
        {solutionName && solutionName !== 'new' && (
          <button css={commonStyles.button} onClick={onEditSolutionClick}>
            <FontAwesomeIcon icon={faEdit} /> Edit Solution
          </button>
        )}
        {solutionName === 'new' ? (
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
