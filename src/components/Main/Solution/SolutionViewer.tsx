import { FunctionComponent, Suspense, lazy, useMemo, useState } from 'react';
import { useAnimationFrame } from '../../../hooks/useAnimationFrame';
import { useSolutionQuery } from '../../../queries/useSolutionQuery';
import { getLanguageFromExtensions, getTheme } from '../../../utilities/monaco';
import { SolutionViewerLoading } from './SolutionViewerLoading';
import { styles } from './styles';

interface SolutionViewerProperties {
  category: CategoryLike;
  solution: SolutionLike;
}

const LazyMonacoEditor = lazy(() =>
  import('../../MonacoEditor/MonacoEditor').then(({ MonacoEditor }) => ({
    default: MonacoEditor,
  })),
);

const Container: FunctionComponent<SolutionViewerProperties> = ({
  category,
  solution,
}) => {
  const { data: code } = useSolutionQuery({ category, solution });

  const language = useMemo(
    () => getLanguageFromExtensions(solution.name),
    [solution.name],
  );

  const [theme, setTheme] = useState<string>();
  useAnimationFrame(() => setTheme(getTheme()));

  return (
    <LazyMonacoEditor
      language={language}
      theme={theme}
      placeholder="Write your solution here..."
      value={code}
    />
  );
};

export const SolutionViewer: FunctionComponent<SolutionViewerProperties> = ({
  category,
  solution,
}) => {
  return (
    <section css={styles.viewer.container}>
      <Suspense fallback={<SolutionViewerLoading />}>
        <Container category={category} solution={solution} />
      </Suspense>
    </section>
  );
};
