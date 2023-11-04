import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import { commonStyles } from '../../styles/common';
import { styles } from './styles';

interface BreadcrumbProperties {
  isCurrent: boolean;
  text: string;
}

export const Breadcrumb: FunctionComponent<
  BreadcrumbProperties & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ isCurrent, text, onClick }) => {
  return isCurrent ? (
    <span css={styles.breadcrumb.text}>
      <b>{text}</b>
    </span>
  ) : (
    <button css={commonStyles.linkButton} onClick={onClick}>
      {text}
    </button>
  );
};
