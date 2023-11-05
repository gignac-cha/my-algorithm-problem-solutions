import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef } from 'react';
import { accessTokenKey } from '../../constants/localStorage';
import { getGitHubAccessToken } from '../../utilities/request';
import { styles } from './styles';

export const OAuth = () => {
  const ref = useRef<number>();

  const callback = useCallback((index: number) => {
    ref.current = requestAnimationFrame(() => callback(index + 1));
    document.title = `${index++ % 2 === 0 ? '⏳' : '⌛️'} Redirecting...`;
  }, []);

  useEffect(() => {
    document.title = 'Redirecting...';

    requestAnimationFrame(() => callback(0));

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

    return () => (ref.current ? cancelAnimationFrame(ref.current) : undefined);
  }, [callback]);

  return (
    <main css={styles.container}>
      <h1>
        <FontAwesomeIcon icon={faSpinner} spin /> Redirecting...
      </h1>
    </main>
  );
};
