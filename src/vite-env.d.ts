/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GITHUB_CLIENT_ID: string;
  readonly VITE_GITHUB_OAUTH_URL: string;
  readonly VITE_GITHUB_OAUTH_CODE_URL: string;
  readonly VITE_GITHUB_API_URL: string;
  readonly VITE_GITHUB_OWNER: string;
  readonly VITE_GITHUB_REPOSITORY: string;
  readonly VITE_GITHUB_USER_NAME: string;
  readonly VITE_GITHUB_USER_EMAIL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
