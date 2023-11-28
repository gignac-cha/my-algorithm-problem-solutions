import { convertGitHubContentResponse } from './github';

const {
  VITE_GITHUB_OAUTH_CODE_URL: GITHUB_OAUTH_CODE_URL,
  VITE_GITHUB_API_URL: GITHUB_API_URL,
  VITE_GITHUB_OWNER: GITHUB_OWNER,
  VITE_GITHUB_REPOSITORY: GITHUB_REPOSITORY,
  VITE_GITHUB_CONTENT_COMMITTER_NAME: GITHUB_CONTENT_COMMITTER_NAME,
  VITE_GITHUB_CONTENT_COMMITTER_EMAIL: GITHUB_CONTENT_COMMITTER_EMAIL,
  VITE_GITHUB_COMMENT_COMMITTER_NAME: GITHUB_COMMENT_COMMITTER_NAME,
  VITE_GITHUB_COMMENT_COMMITTER_EMAIL: GITHUB_COMMENT_COMMITTER_EMAIL,
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
}: Partial<NeedAccessTokenProperties>): Promise<GitHubRateLimitResponse> => {
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
const getGitHubSubRepositoryURL = (
  owner: string,
  repository: string,
  subRepository: string,
  path?: string,
) =>
  `${GITHUB_CONTENTS_API_BASE_URL}/${owner}/${repository}-${subRepository}/contents${
    path ? `/${path}` : ''
  }?ref=test`;
const getGitHubContentsURL = (
  owner: string,
  repository: string,
  path?: string,
) => getGitHubSubRepositoryURL(owner, repository, 'contents', path);

interface GetGitHubContentsProperties {
  path?: string;
}

const getGitHubContents = async <
  T = GitHubContentResponse[] | GitHubContentResponse,
>({
  path,
  accessToken,
}: GetGitHubContentsProperties &
  Partial<NeedAccessTokenProperties>): Promise<T> => {
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
  Partial<NeedAccessTokenProperties>): Promise<GitHubContentResponse> => {
  return getGitHubContents({ path, accessToken });
};

interface AddGitHubContentProperties {
  path: string;
  content: string;
}

const addGitHubContent = async ({
  path,
  content,
  accessToken,
}: AddGitHubContentProperties &
  NeedAccessTokenProperties): Promise<unknown> => {
  const url = new URL(
    getGitHubContentsURL(GITHUB_OWNER, GITHUB_REPOSITORY, path),
  );
  const headers: HeadersInit = {};
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
    headers['Content-Type'] = 'application/json';
  }
  const data: PutGitHubRequest = {
    onwer: GITHUB_OWNER,
    repo: GITHUB_REPOSITORY,
    branch: 'test', // TODO: remove
    path,
    message: `Add ${path}`,
    committer: {
      name: GITHUB_CONTENT_COMMITTER_NAME,
      email: GITHUB_CONTENT_COMMITTER_EMAIL,
    },
    content: btoa(content),
  };
  const body = JSON.stringify(data);
  const response: Response = await fetch(url, { method: 'PUT', headers, body });
  if (!response.ok) {
    throw await response.json();
  }
  return response.json();
};

export const getCategories = async ({
  accessToken,
}: Partial<NeedAccessTokenProperties>): Promise<GitHubContentResponse[]> => {
  return getGitHubContents({ accessToken });
};

interface GetSolutionsProperties {
  category: CategoryLike;
}

export const getSolutions = async ({
  category,
  accessToken,
}: GetSolutionsProperties & Partial<NeedAccessTokenProperties>): Promise<
  GitHubContentResponse[]
> => {
  return getGitHubContents({ path: category.name, accessToken });
};

interface GetSolutionProperties {
  category: CategoryLike;
  solution: SolutionLike;
}

export const getSolution = async ({
  category,
  solution,
  accessToken,
}: GetSolutionProperties &
  Partial<NeedAccessTokenProperties>): Promise<string> => {
  const content: GitHubContentResponse = await getGitHubContent({
    path: `${category.name}/${solution.name}`,
    accessToken,
  });
  const { downloadURL } = convertGitHubContentResponse(content);
  const response: Response = await fetch(downloadURL);
  return response.text();
};

interface AddSolutionProperties {
  category: CategoryLike;
  solution: SolutionLike;
  content: string;
}

export const addSolution = async ({
  category,
  solution,
  content,
  accessToken,
}: AddSolutionProperties & NeedAccessTokenProperties): Promise<unknown> => {
  return addGitHubContent({
    path: `${category.name}/${solution.name}`,
    content,
    accessToken,
  });
};
