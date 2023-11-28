declare type SolutionData = Pick<
  GitHubFileContent,
  'name' | 'path' | 'size' | 'downloadURL'
>;
declare type SolutionLike = Pick<SolutionData, 'name'>;
