import { Route, Routes } from 'react-router-dom';
import { useGitHubRateLimitQuery } from '../../queries/useGitHubQuery';
import { Category } from './Category/Category';
import { GitHubRateLimitError } from './GitHubRateLimitError';
import { GitHubRateLimitErrorBoundary } from './GitHubRateLimitErrorBoundary';
import { Index } from './Index/Index';
import { Solution } from './Solution/Solution';
import { styles } from './styles';

export const Main = () => {
  const { data: rateLimit } = useGitHubRateLimitQuery();

  return (
    <main css={styles.container}>
      <GitHubRateLimitErrorBoundary
        rateLimit={rateLimit}
        fallback={<GitHubRateLimitError rateLimit={rateLimit} />}
      >
        <Routes>
          <Route index element={<Index />} />
          <Route path=":categoryName" element={<Category />} />
          <Route path=":categoryName/:solutionName" element={<Solution />} />
        </Routes>
      </GitHubRateLimitErrorBoundary>
    </main>
  );
};