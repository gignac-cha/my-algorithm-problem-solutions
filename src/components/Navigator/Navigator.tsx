import { Fragment, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';
import { styles } from './styles';

const getBreadcrumbData = (
  searchParams: URLSearchParams,
  url: URL,
  text: string,
) => {
  const link = `${url.pathname}${url.search}`;
  const keys1 = new Set(searchParams.keys());
  const keys2 = new Set(url.searchParams.keys());
  if (keys1.size !== keys2.size) {
    return { link, text, isCurrent: false };
  }
  for (const key of keys1) {
    if (!keys2.has(key)) {
      return { link, text, isCurrent: false };
    }
  }
  for (const key of keys2) {
    if (!keys1.has(key)) {
      return { link, text, isCurrent: false };
    }
  }
  for (const key of keys1) {
    if (searchParams.get(key) !== url.searchParams.get(key)) {
      return { link, text, isCurrent: false };
    }
  }
  return { link, text, isCurrent: true };
};

const getBreadcrumbs = function* (searchParams: URLSearchParams) {
  const url = new URL(window.location.origin);
  url.pathname = '/';
  yield getBreadcrumbData(searchParams, url, 'Home');
  const category = searchParams.get('category');
  if (category) {
    url.searchParams.set('category', category);
    yield getBreadcrumbData(searchParams, url, category);
  }
  const solution = searchParams.get('solution');
  if (category && solution) {
    url.searchParams.set('category', category);
    url.searchParams.set('solution', solution);
    yield getBreadcrumbData(searchParams, url, solution);
  }
};

export const Navigator = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const moveToLink = useCallback((link: string) => navigate(link), [navigate]);

  const breadcrumbs = useMemo(
    () => [...getBreadcrumbs(searchParams)],
    [searchParams],
  );

  return (
    <nav css={styles.container}>
      {breadcrumbs.map(({ link, text, isCurrent }, index: number) => (
        <Fragment key={index}>
          {index > 0 && <BreadcrumbSeparator />}
          <Breadcrumb
            text={text}
            isCurrent={isCurrent}
            onClick={() => moveToLink(link)}
          />
        </Fragment>
      ))}
    </nav>
  );
};
