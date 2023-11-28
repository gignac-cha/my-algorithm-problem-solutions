import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { accessTokenKey } from '../constants/localStorage';
import { defaultFailureCount } from '../constants/query';
import { convertGitHubContentResponse } from '../utilities/github';
import { addSolution, getSolution, getSolutions } from '../utilities/request';

interface UseSolutionsQueryProperties {
  category: CategoryLike;
}

export const useSolutionsQuery = ({
  category,
}: UseSolutionsQueryProperties) => {
  const accessToken = localStorage.getItem(accessTokenKey) ?? undefined;
  return useSuspenseQuery<
    GitHubContentResponse[],
    GitHubContentErrorResponse | GitHubRateLimitErrorResponse,
    GitHubFileContent[]
  >({
    queryKey: ['github', 'content', 'solutions', category.name, accessToken],
    queryFn: () => getSolutions({ category, accessToken }),
    select: (data: GitHubContentResponse[]) =>
      data
        .map((value: GitHubContentResponse) =>
          convertGitHubContentResponse(value),
        )
        .filter(
          (content: GitHubContent): content is GitHubFileContent =>
            content.type === 'file',
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

interface UseSolutionQueryProperties {
  category: CategoryLike;
  solution: SolutionLike;
}

export const useSolutionQuery = ({
  category,
  solution,
}: UseSolutionQueryProperties) => {
  const accessToken = localStorage.getItem(accessTokenKey) ?? undefined;
  return useSuspenseQuery<
    string,
    GitHubContentErrorResponse | GitHubRateLimitErrorResponse
  >({
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

interface UseSolutionAddMutationProperties {
  category: CategoryLike;
}
interface UseSolutionAddMutationFunctionProperties {
  solution: SolutionLike;
  content: string;
}

export const useSolutionAddMutation = ({
  category,
}: UseSolutionAddMutationProperties) => {
  const accessToken = localStorage.getItem(accessTokenKey);
  return useMutation<
    unknown,
    GitHubContentErrorResponse | GitHubRateLimitErrorResponse,
    UseSolutionAddMutationFunctionProperties
  >({
    mutationKey: ['github', 'content', 'solution', category.name, accessToken],
    mutationFn: ({ solution, content }) => {
      if (!accessToken) {
        throw { accessToken, message: 'Invalid access token.' };
      }
      return addSolution({
        category,
        solution,
        content,
        accessToken,
      });
    },
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
