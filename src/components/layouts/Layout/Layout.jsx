import { Header } from '../../commons/Header/Header.jsx';
import { Sidebar } from '../../commons/Sidebar/Sidebar.jsx';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
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
          <div className={styles.content}>{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
