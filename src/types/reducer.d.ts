declare interface GitHubSignReducerState {
  isSigningIn: boolean;
  isSignedIn: boolean;
}
declare interface GitHubSignReducerAction {
  type: 'SIGNING_IN' | 'SIGNED_IN' | 'SIGNED_OUT';
}
