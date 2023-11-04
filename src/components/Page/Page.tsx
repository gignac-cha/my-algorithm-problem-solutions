import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Debug } from '../Debug/Debug';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Navigator } from '../Navigator/Navigator';
import { styles } from './styles';

export const Page = () => {
  return (
    <div css={styles.container}>
      <Header />
      <Routes>
        <Route path=":categoryName?/:solutionName?" element={<Navigator />} />
      </Routes>
      {/* <aside></aside> */}
      <Main />
      {/* <footer></footer> */}
      <Suspense>
        <Debug />
      </Suspense>
    </div>
  );
};
