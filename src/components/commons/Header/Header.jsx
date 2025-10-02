import { Search } from '../Search/Search';
import { Profile } from '../Profile/Profile';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <img
        src="/logo.svg"
        alt="logo"
        width={140}
        height={80}
        className={styles.logo}
      />
      <Search />
      <Profile />
    </header>
  );
};
