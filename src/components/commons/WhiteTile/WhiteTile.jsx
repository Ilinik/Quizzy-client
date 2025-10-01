import styles from './WhiteTile.module.scss';

export const WhiteTile = ({ children }) => {
  return <div className={styles.whiteTile}>{children}</div>;
};
