import { FunctionComponent, Suspense, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSolutionsQuery } from '../../../queries/useSolutionQuery';
import { CategoryNotFoundError } from './CategoryNotFoundError';
import { CategoryNotFoundErrorBoundary } from './CategoryNotFoundErrorBoundary';
import { SolutionListItem } from './SolutionListItem';
import { SolutionListLoading } from './SolutionListLoading';
import { styles } from './styles';

interface SolutionListProperties {
  category: CategoryLike;
}

const Container: FunctionComponent<SolutionListProperties> = ({ category }) => {
  const { data: solutions } = useSolutionsQuery({ category });

  const [searchParams, setSearchParams] = useSearchParams();

  const moveToSolution = useCallback(
    (category: CategoryLike, solution: SolutionLike) => {
      searchParams.set('category', category.name);
      searchParams.set('solution', solution.name);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  return (
    <ul css={styles.solutions.container}>
      {solutions.map((solution: SolutionData, index: number) => (
        <SolutionListItem
          key={index}
          solution={solution}
          onClick={() => moveToSolution(category, solution)}
        />
      ))}
    </ul>
  );
};

export const SolutionList: FunctionComponent<SolutionListProperties> = ({
  category,
}) => {
  return (
    <section>
      <CategoryNotFoundErrorBoundary
        fallback={<CategoryNotFoundError category={category} />}
      >
        <Suspense fallback={<SolutionListLoading />}>
          <Container category={category} />
        </Suspense>
      </CategoryNotFoundErrorBoundary>
    </section>
  );
};
