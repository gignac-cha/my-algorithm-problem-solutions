import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CommentList } from './CommentList';
import { SolutionViewer } from './SolutionViewer';
import { styles } from './styles';

export const Solution = () => {
  const [searchParams] = useSearchParams();

  const [category, solution] = useMemo(
    () => [
      { name: searchParams.get('category') ?? 'INVALID_CATEGORY' },
      { name: searchParams.get('solution') ?? 'INVALID_SOLUTION' },
    ],
    [searchParams],
  );

  return (
    <section css={styles.container}>
      <SolutionViewer category={category} solution={solution} />
      <Suspense>
        <CommentList />
      </Suspense>
    </section>
  );
};
