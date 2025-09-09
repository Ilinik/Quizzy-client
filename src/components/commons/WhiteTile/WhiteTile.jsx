import styles from './WhiteTile.module.css';

export const WhiteTile = ({ children }) => {
  return <div className={styles.whiteTile}>{children}</div>;
};
