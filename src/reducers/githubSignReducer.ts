import { Reducer } from 'react';

export const initialState: GitHubSignReducerState = {
  isSigningIn: false,
  isSignedIn: false,
};

export const githubSignReducer: Reducer<
  GitHubSignReducerState,
  GitHubSignReducerAction
> = (prevState: GitHubSignReducerState, action: GitHubSignReducerAction) => {
  switch (action.type) {
    case 'SIGNING_IN':
      return { ...prevState, isSigningIn: true, isSignedIn: false };
    case 'SIGNED_IN':
      return { ...prevState, isSigningIn: false, isSignedIn: true };
    case 'SIGNED_OUT':
      return { ...prevState, isSigningIn: false, isSignedIn: false };
  }
};
