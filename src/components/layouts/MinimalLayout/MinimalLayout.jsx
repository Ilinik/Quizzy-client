import { Outlet } from 'react-router-dom';
import styles from './MinimalLayout.module.scss';
import { StoreProvider } from '@/components/providers/StoreProvider.jsx';

const MinimalLayout = () => {
  return (
    <StoreProvider>
      <div className="container">
        <main className={styles.pageWrapper}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
      </div>
    </StoreProvider>
  );
};

export default MinimalLayout;
