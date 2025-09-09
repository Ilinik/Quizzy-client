import styles from './SidebarLink.module.css';
import { NavLink } from 'react-router-dom';

export const SidebarLink = ({ name, image, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.button} ${isActive ? styles.buttonActive : ''}`
      }
    >
      {image}
      {name}
    </NavLink>
  );
};
