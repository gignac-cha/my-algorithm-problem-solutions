import { FunctionComponent, useMemo } from 'react';
import { styles } from './styles';

interface ResetAtProperties {
  resetAt: string;
}

const UnauthorizedRateLimitError: FunctionComponent<ResetAtProperties> = ({
  resetAt,
}) => {
  return (
    <>
      <header>
        <b>GitHub API rate limit exceeded.</b>
      </header>
      <span>
        Please sign in with your GitHub account, or wait until reset time.{' '}
        <small>
          <i>({resetAt})</i>
        </small>
      </span>
    </>
  );
};
// const AuthorizedRateLimitError: FunctionComponent<ResetAtProperties> = ({
//   resetAt,
// }) => {
//   return (
//     <>
//       <header>
//         <b>Your GitHub API rate limit exceeded.</b>
//       </header>
//       <span>Please wait until {resetAt}</span>
//     </>
//   );
// };
const UncaughtError = () => {
  return (
    <>
      <header>
        <b>Uncaught Error</b>
      </header>
    </>
  );
};

interface GitHubRateLimitErrorProperties {
  rateLimit: GitHubRateLimit;
}

export const GitHubRateLimitError: FunctionComponent<
  GitHubRateLimitErrorProperties
> = ({ rateLimit }) => {
  // const { data: user } = useGitHubUserQuery();

  const resetAt = useMemo(
    () => new Date(rateLimit.reset * 1000).toString(),
    [rateLimit.reset],
  );

  return (
    <section css={styles.rateLimitError.container}>
      {rateLimit.remaining > 0 ? (
        <UncaughtError />
      ) : (
        // ) : user ? (
        //   <AuthorizedRateLimitError resetAt={resetAt} />
        <UnauthorizedRateLimitError resetAt={resetAt} />
      )}
    </section>
  );
};
