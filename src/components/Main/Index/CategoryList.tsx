import { Suspense, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategoriesQuery } from '../../../queries/useCategoryQuery';
import { CategoryListItem } from './CategoryListItem';
import { CategoryListLoading } from './CategoryListLoading';
import { styles } from './styles';

const Container = () => {
  const { data: categories } = useCategoriesQuery();

  const navigate = useNavigate();
  const moveToCategory = useCallback(
    (category: CategoryLike) => navigate(`/${category.name}`),
    [navigate],
  );

  return (
    <ul css={styles.categories.container}>
      {categories.map((category: CategoryData, index: number) => (
        <CategoryListItem
          key={index}
          category={category}
          onClick={() => moveToCategory(category)}
        />
      ))}
    </ul>
  );
};
export const CategoryList = () => {
  return (
    <section>
      <Suspense fallback={<CategoryListLoading />}>
        <Container />
      </Suspense>
    </section>
  );
};
