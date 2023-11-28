declare interface GitHubAccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}
declare interface GitHubAccessTokenErrorResponse {
  error: string;
  error_description: string;
  error_uri: string;
}

declare interface GitHubRateLimitErrorResponse {
  message: string;
  documentation_url: string;
}

declare interface GitHubRateLimitResponseItem {
  limit: number;
  used: number;
  remaining: number;
  reset: number;
}
declare type GitHubUnauthorizedRateLimit =
  | 'core'
  | 'graphql'
  | 'integration_manifest'
  | 'search';
declare type GitHubAuthorizedRateLimit =
  | GitHubUnauthorizedRateLimit
  | 'source_import'
  | 'code_scanning_upload'
  | 'actions_runner_registration'
  | 'scim'
  | 'dependency_snapshots'
  | 'audit_log'
  | 'code_search';
declare interface GitHubRateLimitResponse {
  resources: {
    [resource in
      | GitHubUnauthorizedRateLimit
      | GitHubAuthorizedRateLimit]: GitHubRateLimitResponseItem;
  };
  rate: GitHubRateLimitResponseItem;
}

declare interface GitHubUserPlan {
  name: 'free';
  space: number;
  collaborators: number;
  private_repos: number;
}
declare interface GitHubUserResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: 'User';
  site_admin: boolean;
  name: string;
  company: unknown;
  blog: string;
  location: string;
  email: unknown;
  hireable: unknown;
  bio: unknown;
  twitter_username: unknown;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: true;
  plan: GitHubUserPlan;
}
declare interface GitHubUserErrorResponse {
  documentation_url: string;
  message: string;
}

declare interface GitHubContentLinks {
  self: string;
  git: string;
  html: string;
}
declare interface GitHubContentResponse {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: 'dir' | 'file';
  _links: GitHubContentLinks;
}
declare interface GitHubContentErrorResponse {
  documentation_url: string;
  message: string;
}
