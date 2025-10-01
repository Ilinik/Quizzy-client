import { SidebarLink } from '../SidebarLink/SidebarLink';
import { staticLinks } from '../../../config/staticLinks';
import { Home } from '../../icons/Home';
import { Quizes } from '../../icons/Quizes';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  const link = [
    {
      name: 'Главная',
      image: <Home />,
      to: staticLinks.main,
    },
    {
      name: 'Квизы',
      image: <Quizes />,
      to: staticLinks.quizes,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {link.map((item) => (
          <SidebarLink
            key={item.name}
            name={item.name}
            image={item.image}
            to={item.to}
          />
        ))}
      </nav>
    </aside>
  );
};
