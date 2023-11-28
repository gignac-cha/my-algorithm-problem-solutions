import { Route, Routes } from 'react-router-dom';
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

  return (
    <main css={styles.container}>
      <GitHubRateLimitErrorBoundary
        rateLimit={rateLimit}
        fallback={<GitHubRateLimitError rateLimit={rateLimit} />}
      >
        <Routes>
          <Route path=":categoryName?/:solutionName?" element={<Header />} />
        </Routes>
        <Routes>
          <Route index element={<Index />} />
          <Route path=":categoryName" element={<Category />} />
          <Route path=":categoryName/new" element={<NewSolution />} />
          <Route path=":categoryName/:solutionName" element={<Solution />} />
        </Routes>
      </GitHubRateLimitErrorBoundary>
    </main>
  );
};
