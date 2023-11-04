import { convertGitHubContentResponse } from './github';

const {
  VITE_GITHUB_OAUTH_CODE_URL: GITHUB_OAUTH_CODE_URL,
  VITE_GITHUB_API_URL: GITHUB_API_URL,
  VITE_GITHUB_OWNER: GITHUB_OWNER,
  VITE_GITHUB_REPOSITORY: GITHUB_REPOSITORY,
} = import.meta.env;

interface GetGitHubAccessTokenProperties {
  code: string;
}

interface GitHubAccessTokenData {
  accessToken: string;
}

export const getGitHubAccessToken = async ({
  code,
}: GetGitHubAccessTokenProperties): Promise<GitHubAccessTokenData> => {
  const url = new URL(GITHUB_OAUTH_CODE_URL);
  url.searchParams.set('code', code);
  const response: Response = await fetch(url);
  const { access_token: accessToken }: GitHubAccessTokenResponse =
    await response.json();
  return { accessToken };
};

const GITHUB_RATE_LIMIT_URL = `${GITHUB_API_URL}/rate_limit`;

export const getGitHubRateLimit = async ({
  accessToken,
}: NeedAccessTokenProperties): Promise<GitHubRateLimitResponse> => {
  const url = new URL(GITHUB_RATE_LIMIT_URL);
  const headers: HeadersInit = {};
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  const response: Response = await fetch(url, { headers });
  return response.json();
};

const GITHUB_USER_API_URL = `${GITHUB_API_URL}/user`;

export const getGitHubUser = async ({
  accessToken,
}: NeedAccessTokenProperties): Promise<GitHubUserResponse> => {
  const url = new URL(GITHUB_USER_API_URL);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response: Response = await fetch(url, { headers });
  if (!response.ok) {
    throw await response.json();
  }
  return response.json();
};

const GITHUB_CONTENTS_API_BASE_URL = `${GITHUB_API_URL}/repos`;
const getGitHubContentsURL = (
  owner: string,
  repository: string,
  path?: string,
) =>
  `${GITHUB_CONTENTS_API_BASE_URL}/${owner}/${repository}-contents/contents${
    path ? `/${path}` : ''
  }`;

interface GetGitHubContentsProperties {
  path?: string;
}

const getGitHubContents = async <
  T = GitHubContentResponse[] | GitHubContentResponse,
>({
  path,
  accessToken,
}: GetGitHubContentsProperties & NeedAccessTokenProperties): Promise<T> => {
  const url = new URL(
    getGitHubContentsURL(GITHUB_OWNER, GITHUB_REPOSITORY, path),
  );
  const headers: HeadersInit = {};
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  const response: Response = await fetch(url, { headers });
  if (!response.ok) {
    throw await response.json();
  }
  return response.json();
};

interface GetGitHubContentProperties {
  path?: string;
}

const getGitHubContent = async ({
  path,
  accessToken,
}: GetGitHubContentProperties &
  NeedAccessTokenProperties): Promise<GitHubContentResponse> => {
  return getGitHubContents({ path, accessToken });
};

export const getCategories = async ({
  accessToken,
}: NeedAccessTokenProperties): Promise<GitHubContentResponse[]> => {
  const contents: GitHubContentResponse[] = await getGitHubContents({
    accessToken,
  });
  return contents.filter(
    (content: GitHubContentResponse) => content.type === 'dir',
  );
};

interface GetSolutionsProperties {
  category: CategoryLike;
}

export const getSolutions = async ({
  category,
  accessToken,
}: GetSolutionsProperties & NeedAccessTokenProperties): Promise<
  GitHubContentResponse[]
> => {
  const contents: GitHubContentResponse[] = await getGitHubContents({
    path: category.name,
    accessToken,
  });
  return contents.filter(
    (content: GitHubContentResponse) => content.type === 'file',
  );
};

interface GetSolutionProperties {
  category: CategoryLike;
  solution: SolutionLike;
}

export const getSolution = async ({
  category,
  solution,
  accessToken,
}: GetSolutionProperties & NeedAccessTokenProperties): Promise<string> => {
  const content: GitHubContentResponse = await getGitHubContent({
    path: `${category.name}/${solution.name}`,
    accessToken,
  });
  const { downloadURL } = convertGitHubContentResponse(content);
  const response: Response = await fetch(downloadURL);
  return response.text();
};
