import { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CommentList } from './CommentList';
import { SolutionViewer } from './SolutionViewer';
import { styles } from './styles';

export const Solution = () => {
  const { categoryName = '', solutionName = '' } =
    useParams<RouterParameters>();

  const category = useMemo(() => ({ name: categoryName }), [categoryName]);
  const solution = useMemo(() => ({ name: solutionName }), [solutionName]);

  return (
    <section css={styles.container}>
      <SolutionViewer category={category} solution={solution} />
      <Suspense>
        <CommentList />
      </Suspense>
    </section>
  );
};
