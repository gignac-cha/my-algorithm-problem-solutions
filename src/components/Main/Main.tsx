import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGitHubRateLimitQuery } from '../../queries/useGitHubQuery';
import { Category } from './Category/Category';
import { GitHubRateLimitError } from './GitHubRateLimitError';
import { GitHubRateLimitErrorBoundary } from './GitHubRateLimitErrorBoundary';
import { Header } from './Header';
import { Index } from './Index/Index';
import { NewSolution } from './NewSolution/NewSolution';
import { Solution } from './Solution/Solution';
import { styles } from './styles';

export const Main = () => {
  const { data: rateLimit } = useGitHubRateLimitQuery();

  const [searchParams] = useSearchParams();

  const [categoryName, solutionName, isNew, isEdit] = useMemo(
    () => [
      searchParams.get('category'),
      searchParams.get('solution'),
      searchParams.has('new'),
      searchParams.has('edit'),
    ],
    [searchParams],
  );

  return (
    <main css={styles.container}>
      <GitHubRateLimitErrorBoundary
        rateLimit={rateLimit}
        fallback={<GitHubRateLimitError rateLimit={rateLimit} />}
      >
        <Suspense>
          <Header />
        </Suspense>
        {!categoryName && !solutionName && <Index />}
        {categoryName && !solutionName && !isNew && <Category />}
        {categoryName && !solutionName && isNew && <NewSolution />}
        {categoryName && solutionName && !isEdit && <Solution />}
        {/* {categoryName && solutionName && isEdit && <EditSolution />} */}
      </GitHubRateLimitErrorBoundary>
    </main>
  );
};
