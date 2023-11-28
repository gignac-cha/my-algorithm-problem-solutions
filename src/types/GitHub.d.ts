declare type GitHubRateLimit = GitHubRateLimitResponse['rate'];

declare interface GitHubUser {
  id: string;
  name: string;
  avatarURL: string;
}

declare interface GitHubBaseContent {
  name: string;
  path: string;
  size: number;
  downloadURL: string;
}
declare interface GitHubDirContent extends GitHubBaseContent {
  type: 'dir';
}
declare interface GitHubFileContent extends GitHubBaseContent {
  type: 'file';
}
declare type GitHubContent = GitHubDirContent | GitHubFileContent;
