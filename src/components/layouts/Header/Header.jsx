import { observer } from 'mobx-react-lite';
import { Search } from '../../commons/Search/Search.jsx';
import { Profile } from '../../commons/Profile/Profile.jsx';

import styles from './Header.module.scss';
import { useStore } from '@/hooks/useStore.js';
import Button from '@/components/commons/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';

export const Header = observer(({ showSearch = false }) => {
  const authStore = useStore().auth;
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <img
        src="/logo.svg"
        alt="logo"
        width={140}
        height={80}
        className={styles.logo}
        onClick={() => {
          navigate('/');
        }}
      />
      {authStore.isAuth ? (
        <>
          {showSearch && <Search />}
          <Profile user={authStore.user} />
        </>
      ) : (
        <div className={styles.buttons}>
          <Button
            color="neutral"
            variant="outline"
            onClick={() => navigate('/login')}
          >
            Войти
          </Button>
          <Button onClick={() => navigate('/registration')}>
            Зарегистрироваться
          </Button>
        </div>
      )}
    </header>
  );
});
