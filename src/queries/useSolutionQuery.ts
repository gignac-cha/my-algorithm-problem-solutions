import { useSuspenseQuery } from '@tanstack/react-query';
import { accessTokenKey } from '../constants/localStorage';
import { defaultFailureCount } from '../constants/query';
import { convertGitHubContentResponse } from '../utilities/github';
import { getSolution, getSolutions } from '../utilities/request';

export const useSolutionsQuery = (category: CategoryLike) => {
  const accessToken = localStorage.getItem(accessTokenKey);
  return useSuspenseQuery({
    queryKey: ['github', 'content', 'solutions', category.name, accessToken],
    queryFn: () => getSolutions({ category, accessToken }),
    select: (data: GitHubContentResponse[]) =>
      data.map((value: GitHubContentResponse) =>
        convertGitHubContentResponse(value),
      ),
    retry: (failureCount: number, error: GitHubRateLimitErrorResponse) => {
      if (failureCount > defaultFailureCount) {
        return false;
      } else if (error.message.startsWith('API rate limit exceeded')) {
        return false;
      }
      return true;
    },
  });
};

export const useSolutionQuery = (
  category: CategoryLike,
  solution: SolutionLike,
) => {
  const accessToken = localStorage.getItem(accessTokenKey);
  return useSuspenseQuery({
    queryKey: [
      'github',
      'content',
      'solution',
      category.name,
      solution.name,
      accessToken,
    ],
    queryFn: () => getSolution({ category, solution, accessToken }),
    retry: (failureCount: number, error: GitHubRateLimitErrorResponse) => {
      if (failureCount > defaultFailureCount) {
        return false;
      } else if (error.message.startsWith('API rate limit exceeded')) {
        return false;
      }
      return true;
    },
  });
};
