import { FunctionComponent } from 'react';

interface BreadcrumbSeparatorProperties {
  separator?: string;
}

export const BreadcrumbSeparator: FunctionComponent<
  BreadcrumbSeparatorProperties
> = ({ separator = '/' }) => {
  return <span>{separator}</span>;
};
