import { Fragment, useCallback, useMemo } from 'react';
import {
  Location,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';
import { styles } from './styles';

const getBreadcrumbData = (location: Location, link: string, text: string) => {
  return { link, text, isCurrent: location.pathname === link };
};

const getBreadcurmbs = function* (
  location: Location,
  categoryName?: string,
  solutionName?: string,
) {
  yield getBreadcrumbData(location, '/', 'Home');
  if (categoryName) {
    yield getBreadcrumbData(location, `/${categoryName}`, categoryName);
  }
  if (categoryName && solutionName) {
    yield getBreadcrumbData(
      location,
      `/${categoryName}/${solutionName}`,
      solutionName,
    );
  }
};

export const Navigator = () => {
  const { categoryName = '', solutionName = '' } =
    useParams<RouterParameters>();

  const navigate = useNavigate();
  const moveToLink = useCallback((link: string) => navigate(link), [navigate]);

  const location = useLocation();

  const breadcrumbs = useMemo(
    () => [...getBreadcurmbs(location, categoryName, solutionName)],
    [categoryName, location, solutionName],
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
