import { Header } from '../Header/Header.jsx';
import { Sidebar } from '../Sidebar/Sidebar.jsx';
import styles from './Layout.module.scss';
import Button from '@/components/commons/Button/Button.jsx';
import { useState } from 'react';
import Footer from '@/components/layouts/Footer/Footer.jsx';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className={styles.headerWrapper}>
        <div className="container">
          <Header />
        </div>
      </div>

      <div className="container">
        <main className={styles.pageWrapper}>
          <Button
            className={styles.menuButton}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            Меню
          </Button>

          <Sidebar isOpen={isSidebarOpen} setOpen={setIsSidebarOpen} />

          <div className={styles.content}>{children}</div>
        </main>
      </div>

      <div className="container">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
