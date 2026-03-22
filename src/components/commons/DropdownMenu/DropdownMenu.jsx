import Button from '@/components/commons/Button/Button.jsx';
import { useStore } from '@/hooks/useStore.js';
import { observer } from 'mobx-react-lite';
import styles from './DropdownMenu.module.scss';

const DropdownMenu = observer(() => {
  const authStore = useStore().auth;

  return (
    <div className={styles.dropdownMenu}>
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
