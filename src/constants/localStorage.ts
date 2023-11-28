export const accessTokenKey = 'github:oauth:access-token';

const editorCacheKey = 'editor:cache';
export const editorLanguageCacheKey = `${editorCacheKey}:langauge`;
export const getEditorNameCacheKey = (
  category: CategoryLike,
  solution?: SolutionLike,
) =>
  solution
    ? `${editorCacheKey}:${category.name}:${solution.name}:name`
    : `${editorCacheKey}:${category.name}:name`;
export const getEditorValueCacheKey = (
  category: CategoryLike,
  solution?: SolutionLike,
) =>
  solution
    ? `${editorCacheKey}:${category.name}:${solution.name}:value`
    : `${editorCacheKey}:${category.name}:value`;
