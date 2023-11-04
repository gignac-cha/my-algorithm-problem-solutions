import { FunctionComponent, Suspense, useMemo } from 'react';
import { useSolutionQuery } from '../../../queries/useSolutionQuery';
import {
  getLanguageFromExtensions,
  getTheme,
} from '../../../utilities/monacoEditor';
import { MonacoEditor } from '../../MonacoEditor/MonacoEditor';
import { SolutionViewerLoading } from './SolutionViewerLoading';
import { styles } from './styles';

interface SolutionViewerProperties {
  category: CategoryLike;
  solution: SolutionLike;
}

const Container: FunctionComponent<SolutionViewerProperties> = ({
  category,
  solution,
}) => {
  const { data: code } = useSolutionQuery(category, solution);

  const language = useMemo(
    () => getLanguageFromExtensions(solution.name),
    [solution.name],
  );

  const theme = useMemo(() => getTheme(), []);

  return <MonacoEditor value={code} language={language} theme={theme} />;
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
