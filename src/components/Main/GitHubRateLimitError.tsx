import { FunctionComponent, useMemo } from 'react';
import { useGitHubUserQuery } from '../../queries/useGitHubQuery';
import { Separator } from '../Separator/Separator';
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
      <Separator width={'0px'} />
      <small>
        Please sign in with your GitHub account, or wait until reset time.
        <div>
          <small>
            <i>(Reset time: {resetAt})</i>
          </small>
        </div>
      </small>
    </>
  );
};
const AuthorizedRateLimitError: FunctionComponent<ResetAtProperties> = ({
  resetAt,
}) => {
  return (
    <>
      <header>
        <b>Your GitHub API rate limit exceeded.</b>
      </header>
      <Separator width={'0px'} />
      <small>
        Please wait until reset time.
        <div>
          <small>
            <i>(Reset time: {resetAt})</i>
          </small>
        </div>
      </small>
    </>
  );
};

interface GitHubRateLimitErrorProperties {
  rateLimit: GitHubRateLimit;
}

export const GitHubRateLimitError: FunctionComponent<
  GitHubRateLimitErrorProperties
> = ({ rateLimit }) => {
  const { data: user } = useGitHubUserQuery();

  const resetAt = useMemo(
    () => new Date(rateLimit.reset * 1000).toString(),
    [rateLimit.reset],
  );

  return (
    <section css={styles.rateLimitError.container}>
      {!user ? (
        <AuthorizedRateLimitError resetAt={resetAt} />
      ) : (
        <UnauthorizedRateLimitError resetAt={resetAt} />
      )}
    </section>
  );
};
