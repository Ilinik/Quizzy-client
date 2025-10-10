import { observer } from 'mobx-react-lite';
import { Search } from '../Search/Search';
import { Profile } from '../Profile/Profile';

import styles from './Header.module.scss';
import { useStore } from '@/hooks/useStore.js';
import Button from '@/components/commons/Button/Button.jsx';

export const Header = observer(() => {
  const authStore = useStore().auth;
  return (
    <header className={styles.header}>
      <img
        src="/logo.svg"
        alt="logo"
        width={140}
        height={80}
        className={styles.logo}
      />
      {authStore.isAuthenticated ? (
        <>
          <Search />
          <Profile user={authStore.user} />
        </>
      ) : (
        <div className={styles.buttons}>
          <Button color="neutral" outline>
            Войти
          </Button>
          <Button>Зарегистрироваться</Button>
        </div>
      )}
    </header>
  );
});
