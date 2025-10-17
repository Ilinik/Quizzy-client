import { Outlet } from 'react-router-dom';
import styles from './MinimalLayout.module.scss';
import { useStore } from '@/hooks/useStore.js';
import { useEffect } from 'react';
import Loader from '@/components/commons/Loader/Loader.jsx';
import { observer } from 'mobx-react-lite';

const MinimalLayout = observer(() => {
  const authStore = useStore().auth;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      authStore.checkAuth();
    }
  }, []);

  if (authStore.isLoading) {
    return (
      <div className="loaderWrapper">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="container">
      <main className={styles.pageWrapper}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
});

export default MinimalLayout;
