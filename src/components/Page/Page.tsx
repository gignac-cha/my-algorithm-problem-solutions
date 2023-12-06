import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Navigator } from '../Navigator/Navigator';
import { styles } from './styles';

export const Page = () => {
  return (
    <div css={styles.container}>
      <Header />
      <Navigator />
      {/* <aside></aside> */}
      <Main />
      {/* <footer></footer> */}
    </div>
  );
};
