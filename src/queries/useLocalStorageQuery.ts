import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

const localStorageQueryKey = ['localStorage'];

export const localStorageGetItemQueryKey = [...localStorageQueryKey, 'getITem'];

export const useLocalStorageQuery = (key: string, defaultValue: string) =>
  useSuspenseQuery<string, Error>({
    queryKey: [...localStorageGetItemQueryKey, key],
    queryFn: () => localStorage.getItem(key) ?? defaultValue,
  });

const localStorageSetItemQueryKey = [...localStorageQueryKey, 'setITem'];

export const useLocalStorageMutation = (key: string) =>
  useMutation<void, Error, string | undefined>({
    mutationKey: [...localStorageSetItemQueryKey, key],
    mutationFn: async (value?: string) =>
      value ? localStorage.setItem(key, value) : localStorage.removeItem(key),
  });
