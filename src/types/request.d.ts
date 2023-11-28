declare interface NeedAccessTokenProperties {
  accessToken: string | null;
}

declare interface GitHubCommitter {
  name: string;
  email: string;
}

declare interface PutGitHubRequest {
  onwer: string;
  repo: string;
  branch: string; // TODO: remove
  path: string;
  message: string;
  committer: GitHubCommitter;
  content: string;
}
