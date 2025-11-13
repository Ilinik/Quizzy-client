import styles from './PageTitle.module.scss';

const PageTitle = ({ title, subtitle }) => {
  return (
    <div className={styles.pageTitle}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

export default PageTitle;
