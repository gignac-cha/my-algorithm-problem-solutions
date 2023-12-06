import { FunctionComponent } from 'react';
import { commonStyles } from '../../../styles/common';

interface SolutionNotFoundErrorProperties {
  category: CategoryLike;
  solution: SolutionLike;
}

export const SolutionNotFoundError: FunctionComponent<
  SolutionNotFoundErrorProperties
> = ({ category, solution }) => {
  return (
    <section css={commonStyles.error.container}>
      <header>
        <b>
          Solution{' '}
          <small>
            <code css={[commonStyles.badge, commonStyles.errorBadge]}>
              {solution.name}
            </code>
          </small>{' '}
          is not found in category{' '}
          <small>
            <code css={[commonStyles.badge, commonStyles.errorBadge]}>
              {category.name}
            </code>
          </small>{' '}
          .
        </b>
      </header>
    </section>
  );
};
