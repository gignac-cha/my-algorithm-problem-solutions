import { accessTokenKey } from '../constants/localStorage';

export const getAccessToken = async () =>
  new Promise<void>((resolve) => {
    const url = new URL(import.meta.env.VITE_GITHUB_OAUTH_URL);
    url.searchParams.set('client_id', import.meta.env.VITE_GITHUB_CLIENT_ID);
    url.searchParams.set('scope', 'repo,user');
    url.searchParams.set(
      'redirect_uri',
      `${window.location.origin}/${
        import.meta.env.VITE_GITHUB_REPOSITORY
      }/oauth/github`,
    );

    const childWindow = window.open(url);
    const onBeforeUnload = async () => {
      childWindow?.removeEventListener('beforeunload', onBeforeUnload);
      resolve();
    };
    childWindow?.addEventListener('beforeunload', onBeforeUnload);
  });

export const getCachedAccessToken = (): string | undefined => {
  const accessToken = localStorage.getItem(accessTokenKey);
  if (accessToken) {
    return accessToken;
  }
};

export const convertGitHubRateLimitResponse = ({
  rate,
}: GitHubRateLimitResponse) => rate;

export const convertGitHubUserResponse = ({
  login: id,
  name,
  avatar_url: avatarURL,
}: GitHubUserResponse): GitHubUser => ({ id, name, avatarURL });

export const convertGitHubContentResponse = ({
  type,
  name,
  path,
  size,
  download_url: downloadURL,
}: GitHubContentResponse): GitHubContent => ({
  type,
  name,
  path,
  size,
  downloadURL,
});
