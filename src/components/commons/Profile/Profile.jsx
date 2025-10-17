import { useState, useRef, useEffect } from 'react';
import styles from './Profile.module.scss';
import DropdownMenu from '@/components/commons/DropdownMenu/DropdownMenu.jsx';

export const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
        <img
          src="/images/profile-picture.png"
          alt="profile"
          className={styles.profilePicture}
        />
        <p className={styles.profileName}>Michael Clifford</p>
      </div>

      {menuOpen && <DropdownMenu />}
    </div>
  );
};
