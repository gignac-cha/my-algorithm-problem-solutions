import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { accessTokenKey } from '../../constants/localStorage';
import { getGitHubAccessToken } from '../../utilities/request';
import { styles } from './styles';

export const OAuth = () => {
  useEffect(() => {
    document.title = 'Redirecting...';
    let index = 0;
    const intervalId = setInterval(
      () =>
        (document.title = `${index++ % 2 === 0 ? '⏳' : '⌛️'} Redirecting...`),
      1000 / 6,
    );

    const url = new URL(location.href);
    const code = url.searchParams.get('code');
    if (code) {
      getGitHubAccessToken({ code })
        .then(({ accessToken }) => {
          if (accessToken) {
            localStorage.setItem(accessTokenKey, accessToken);
          }
        })
        .catch((reason: GitHubAccessTokenErrorResponse) => {
          if (reason.error) {
            localStorage.removeItem(accessTokenKey);
          }
        })
        .finally(() => window.close());
    }

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main css={styles.container}>
      <h1>
        <FontAwesomeIcon icon={faSpinner} spin /> Redirecting...
      </h1>
    </main>
  );
};
