import styles from './DropdownMenu.module.scss';
import Button from '@/components/commons/Button/Button.jsx';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';

const DropdownMenu = observer(() => {
  const authStore = useStore().auth;

  return (
    <div className={styles.dropdownMenu}>
      <Button color="neutral" variant="light" className={styles.menuButton}>
        Настройки
      </Button>
      <Button
        color="danger"
        variant="light"
        className={styles.menuButton}
        onClick={() => authStore.logout()}
      >
        Выйти
      </Button>
    </div>
  );
});

export default DropdownMenu;
