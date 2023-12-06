import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { accessTokenKey } from '../constants/localStorage';
import { defaultFailureCount } from '../constants/query';
import {
  convertGitHubRateLimitResponse,
  convertGitHubUserResponse,
} from '../utilities/github';
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
  const accessToken = localStorage.getItem(accessTokenKey) ?? undefined;
  return useSuspenseQuery({
    queryKey: [...githubRateLimitQueryKey, accessToken],
    queryFn: async () => {
      return getGitHubRateLimit({ accessToken });
    },
    select: convertGitHubRateLimitResponse,
  });
};

export const useGitHubUserQuery = () => {
  const accessToken = localStorage.getItem(accessTokenKey);
  return useQuery<GitHubUserResponse, GitHubUserErrorResponse, GitHubUser>({
    queryKey: ['github', 'user', accessToken],
    queryFn: async () => {
      if (!accessToken) {
        throw { accessToken, message: 'Invalid access token.' };
      }
      return getGitHubUser({ accessToken });
    },
    select: convertGitHubUserResponse,
    retry: (failureCount: number, error: GitHubUserErrorResponse) => {
      if (failureCount > defaultFailureCount) {
        return false;
      } else if (error.message === 'Bad credentials') {
        return false;
      }
      return true;
    },
    enabled: !!accessToken,
  });
};
export const useGitHubUserSuspenseQuery = () => {
  const accessToken = localStorage.getItem(accessTokenKey);
  return useSuspenseQuery<
    GitHubUserResponse,
    GitHubUserErrorResponse,
    GitHubUser
  >({
    queryKey: ['github', 'user', accessToken],
    queryFn: async () => {
      if (!accessToken) {
        throw { accessToken, message: 'Invalid access token.' };
      }
      return getGitHubUser({ accessToken });
    },
    select: convertGitHubUserResponse,
    retry: (failureCount: number, error: GitHubUserErrorResponse) => {
      if (failureCount > defaultFailureCount) {
        return false;
      } else if (error.message === 'Bad credentials') {
        return false;
      }
      return true;
    },
  });
};
