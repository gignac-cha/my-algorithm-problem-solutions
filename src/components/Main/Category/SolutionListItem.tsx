import { faPython } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import { convertByteUnit } from '../../../utilities/common';
import { styles } from './styles';

interface SolutionListItemProperties {
  solution: SolutionData;
}

export const SolutionListItem: FunctionComponent<
  SolutionListItemProperties & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ solution, onClick }) => {
  return (
    <li css={styles.solution.container}>
      <button css={styles.solution.buttonContainer} onClick={onClick}>
        <span>
          <FontAwesomeIcon icon={faPython} />
        </span>
        <span>
          {solution.name} <small>({convertByteUnit(solution.size)})</small>
        </span>
      </button>
    </li>
  );
};
