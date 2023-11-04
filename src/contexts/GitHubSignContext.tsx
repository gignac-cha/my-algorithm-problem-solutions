import { useQueryClient } from '@tanstack/react-query';
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  githubAccessTokenQueryKey,
  githubRateLimitQueryKey,
  useGitHubAccessTokenDeleteMutation,
  useGitHubAccessTokenQuery,
} from '../queries/useGitHubQuery';
import { githubSignReducer, initialState } from '../reducers/githubSignReducer';
import { doNothing } from '../utilities/common';
import { getAccessToken } from '../utilities/github';

export interface GitHubSignContextProperties extends GitHubSignReducerState {
  signIn: () => void;
  onSignedIn: () => void;
  signOut: () => void;
}

const defaultValue: GitHubSignContextProperties = {
  signIn: doNothing,
  onSignedIn: doNothing,
  signOut: doNothing,
  ...initialState,
};

const GitHubSignContext =
  createContext<GitHubSignContextProperties>(defaultValue);

export const GitHubSignContextProvider: FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
  const { data: accessToken } = useGitHubAccessTokenQuery();

  const [state, dispatch] = useReducer(githubSignReducer, {
    ...initialState,
    isSigningIn: !!accessToken,
  });

  useEffect(() => {
    if (accessToken) {
      dispatch({ type: 'SIGNING_IN' });
    }
  }, [accessToken]);

  const queryClient = useQueryClient();

  const { mutateAsync: deleteAccessToken } =
    useGitHubAccessTokenDeleteMutation();

  const signIn = useCallback(async () => {
    dispatch({ type: 'SIGNING_IN' });
    await getAccessToken();
    queryClient.invalidateQueries({ queryKey: githubAccessTokenQueryKey });
  }, [queryClient]);

  const onSignedIn = useCallback(() => {
    dispatch({ type: 'SIGNED_IN' });
    queryClient.invalidateQueries({ queryKey: githubRateLimitQueryKey });
  }, [queryClient]);

  const signOut = useCallback(async () => {
    await deleteAccessToken();
    queryClient.invalidateQueries({ queryKey: githubAccessTokenQueryKey });
    dispatch({ type: 'SIGNED_OUT' });
  }, [deleteAccessToken, queryClient]);

  return (
    <GitHubSignContext.Provider
      value={{ ...state, signIn, onSignedIn, signOut }}
    >
      {children}
    </GitHubSignContext.Provider>
  );
};

export const useGitHubSignContext = () => useContext(GitHubSignContext);
