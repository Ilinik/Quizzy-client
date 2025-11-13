import { SidebarLink } from '../SidebarLink/SidebarLink';
import { staticLinks } from '../../../config/staticLinks';
import { Quizes } from '../../icons/Quizes';
import Folder from '@/components/icons/Folder.jsx';
import styles from './Sidebar.module.scss';

export const Sidebar = ({ isOpen }) => {
  const link = [
    {
      name: 'Квизы',
      image: <Quizes />,
      to: staticLinks.quizzes,
    },
    {
      name: 'Мои квизы',
      image: <Folder />,
      to: staticLinks.myQuizzes,
    },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
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
