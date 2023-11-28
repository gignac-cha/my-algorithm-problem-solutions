import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SolutionList } from './SolutionList';

export const Category = () => {
  const { categoryName = '' } = useParams<RouterParameters>();

  const category = useMemo(() => ({ name: categoryName }), [categoryName]);

  return <SolutionList category={category} />;
};
