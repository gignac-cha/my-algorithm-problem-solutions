import { commonStyles } from '../../styles/common';

export const UncaughtError = () => {
  return (
    <section css={commonStyles.error.container}>
      <header>
        <b>Uncaught Error</b>
      </header>
    </section>
  );
};
