import { FunctionComponent } from 'react';
import { commonStyles } from '../../../styles/common';

interface CategoryNotFoundErrorProperties {
  category: CategoryLike;
}

export const CategoryNotFoundError: FunctionComponent<
  CategoryNotFoundErrorProperties
> = ({ category }) => {
  return (
    <section css={commonStyles.error.container}>
      <header>
        <b>
          Category{' '}
          <small>
            <code css={[commonStyles.badge, commonStyles.errorBadge]}>
              {category.name}
            </code>
          </small>{' '}
          is not found.
        </b>
      </header>
    </section>
  );
};
