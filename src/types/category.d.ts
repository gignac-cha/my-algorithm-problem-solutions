declare type CategoryData = Pick<GitHubDirContent, 'name' | 'path'>;
declare type CategoryLike = Pick<CategoryData, 'name'>;
