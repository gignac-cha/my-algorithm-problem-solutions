import { useEffect } from 'react';
import { GitHubSign } from './GitHubSign';
import { styles } from './styles';

export const Header = () => {
  const title = '💡 My PS Diary';

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <header css={styles.container}>
      <h1>{title}</h1>
      <GitHubSign />
    </header>
  );
};
