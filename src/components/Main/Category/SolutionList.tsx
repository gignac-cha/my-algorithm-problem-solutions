import { FunctionComponent, Suspense, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSolutionsQuery } from '../../../queries/useSolutionQuery';
import { SolutionListItem } from './SolutionListItem';
import { SolutionListLoading } from './SolutionListLoading';
import { styles } from './styles';

interface SolutionListProperties {
  category: CategoryLike;
}

const Container: FunctionComponent<SolutionListProperties> = ({ category }) => {
  const { data: solutions } = useSolutionsQuery(category);

  const navigate = useNavigate();
  const moveToSolution = useCallback(
    (category: CategoryLike, solution: SolutionLike) =>
      navigate(`/${category.name}/${solution.name}`),
    [navigate],
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
      <Suspense fallback={<SolutionListLoading />}>
        <Container category={category} />
      </Suspense>
    </section>
  );
};
