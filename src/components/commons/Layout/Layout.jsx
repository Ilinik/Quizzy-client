import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <div className="container">
      <div className={styles.layout}>
        <Header />
        <main className={styles.pageWrapper}>
          <Sidebar />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
