import { Outlet } from 'react-router-dom';
import styles from './MinimalLayout.module.scss';

const MinimalLayout = () => {
  return (
    <div className="container">
      <main className={styles.pageWrapper}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MinimalLayout;
