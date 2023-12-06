import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { accessTokenKey } from '../../constants/localStorage';
import { useAnimationFrame } from '../../hooks/useAnimationFrame';
import { getGitHubAccessToken } from '../../utilities/request';
import { styles } from './styles';

export const OAuth = () => {
  useEffect(() => {
    document.title = 'Redirecting...';

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
  }, []);

  const ref = useRef(0);

  useAnimationFrame(
    () =>
      (document.title = `${
        ref.current++ % 2 === 0 ? '⏳' : '⌛️'
      } Redirecting...`),
  );

  return (
    <main css={styles.container}>
      <h1>
        <FontAwesomeIcon icon={faSpinner} spin /> Redirecting...
      </h1>
    </main>
  );
};
