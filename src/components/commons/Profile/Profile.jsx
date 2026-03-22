import DropdownMenu from '@/components/commons/DropdownMenu/DropdownMenu.jsx';
import { useStore } from '@/hooks/useStore.js';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import styles from './Profile.module.scss';

export const Profile = observer(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const authStore = useStore().auth;

  const avatarLink = `https://api.dicebear.com/7.x/avataaars/svg?seed=${authStore.user.id}`;

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.profileWrapper} ref={menuRef}>
      <div className={styles.profile} onClick={handleToggleMenu}>
        <img src={avatarLink} alt="profile" className={styles.profilePicture} />
        <p className={styles.profileName}>
          {authStore.user?.name || 'Профиль'}
        </p>
      </div>

      {menuOpen && <DropdownMenu />}
    </div>
  );
});
