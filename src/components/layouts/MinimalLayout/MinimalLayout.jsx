import { Outlet } from 'react-router-dom';
import styles from './MinimalLayout.module.scss';
import { useStore } from '@/hooks/useStore.js';
import { useEffect } from 'react';

const MinimalLayout = () => {
  const authStore = useStore().auth;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      authStore.checkAuth();
    }
  }, []);

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
