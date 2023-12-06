import { Properties } from 'csstype';
import { CSSProperties, FunctionComponent, useMemo } from 'react';
import { styles } from './styles';

interface SeparatorProperties {
  color?: Properties['backgroundColor'];
  width: Properties['height'];
}

export const Separator: FunctionComponent<SeparatorProperties> = ({
  color,
  width,
}) => {
  const style = useMemo(
    (): CSSProperties => ({ backgroundColor: color, height: width }),
    [color, width],
  );

  return <hr css={styles.container} style={style} />;
};
