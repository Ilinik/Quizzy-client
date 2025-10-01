import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <>
      <div className={styles.headerWrapper}>
        <div className="container">
          <Header />
        </div>
      </div>

      <div className="container">
        <main className={styles.pageWrapper}>
          <Sidebar />
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};