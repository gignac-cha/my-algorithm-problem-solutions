import { useSuspenseQuery } from '@tanstack/react-query';
import { accessTokenKey } from '../constants/localStorage';
import { defaultFailureCount } from '../constants/query';
import { convertGitHubContentResponse } from '../utilities/github';
import { getCategories } from '../utilities/request';

export const useCategoriesQuery = () => {
  const accessToken = localStorage.getItem(accessTokenKey) ?? undefined;
  return useSuspenseQuery<
    GitHubContentResponse[],
    GitHubContentErrorResponse | GitHubRateLimitErrorResponse,
    GitHubDirContent[]
  >({
    queryKey: ['github', 'content', 'categories', accessToken],
    queryFn: () => getCategories({ accessToken }),
    select: (data: GitHubContentResponse[]) =>
      data
        .map((value: GitHubContentResponse) =>
          convertGitHubContentResponse(value),
        )
        .filter(
          (content: GitHubContent): content is GitHubDirContent =>
            content.type === 'dir',
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
