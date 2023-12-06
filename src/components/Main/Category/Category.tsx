import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SolutionList } from './SolutionList';

export const Category = () => {
  const [searchParams] = useSearchParams();

  const category = useMemo(
    () => ({ name: searchParams.get('category') ?? 'INVALID_CATEGORY' }),
    [searchParams],
  );

  return <SolutionList category={category} />;
};
