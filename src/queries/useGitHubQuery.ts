import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { accessTokenKey } from '../constants/localStorage';
import { defaultFailureCount } from '../constants/query';
import { convertGitHubRateLimitResponse } from '../utilities/github';
import { getGitHubRateLimit, getGitHubUser } from '../utilities/request';

export const githubAccessTokenQueryKey = ['github', 'accessToken'];

export const useGitHubAccessTokenQuery = () =>
  useSuspenseQuery<string | null>({
    queryKey: githubAccessTokenQueryKey,
    queryFn: () => localStorage.getItem(accessTokenKey),
  });

export const useGitHubAccessTokenDeleteMutation = () =>
  useMutation<void>({
    mutationKey: ['github', 'accessToken', 'delete'],
    mutationFn: async () => localStorage.removeItem(accessTokenKey),
  });

export const githubRateLimitQueryKey = ['github', 'rateLimit'];

export const useGitHubRateLimitQuery = () => {
  return useSuspenseQuery({
    queryKey: githubRateLimitQueryKey,
    queryFn: async () => {
      const accessToken = localStorage.getItem(accessTokenKey);
      return getGitHubRateLimit({ accessToken });
    },
    select: convertGitHubRateLimitResponse,
  });
};

const githubUserQueryFunction = async ({
  accessToken,
}: NeedAccessTokenProperties) => {
  if (!accessToken) {
    throw { accessToken, message: 'Invalid access token.' };
  }
  return getGitHubUser({ accessToken });
};
const githubUserSelect = ({
  login: id,
  name,
  avatar_url: avatarURL,
}: GitHubUserResponse) => ({ id, name, avatarURL });
const githubUserRetry = (
  failureCount: number,
  error: GitHubUserErrorResponse,
) => {
  if (failureCount > defaultFailureCount) {
    return false;
  } else if (error.message === 'Bad credentials') {
    return false;
  }
  return true;
};

export const useGitHubUserQuery = () => {
  const accessToken = localStorage.getItem(accessTokenKey);
  return useSuspenseQuery<
    GitHubUserResponse,
    GitHubUserErrorResponse,
    GitHubUser
  >({
    queryKey: ['github', 'user', accessToken],
    queryFn: () => githubUserQueryFunction({ accessToken }),
    select: githubUserSelect,
    retry: githubUserRetry,
  });
};

// export const useGitHubUserQuery = () => {
//   const accessToken = localStorage.getItem(accessTokenKey);
//   return useQuery<GitHubUserResponse, GitHubUserErrorResponse, GitHubUser>({
//     queryKey: ['github', 'user', accessToken],
//     queryFn: () => githubUserQueryFunction({ accessToken }),
//     select: githubUserSelect,
//     retry: githubUserRetry,
//     enabled: !!accessToken,
//   });
// };
