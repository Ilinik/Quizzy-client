import { SidebarLink } from '../../commons/SidebarLink/SidebarLink.jsx';
import { staticLinks } from '../../../config/staticLinks.js';
import { Quizes } from '../../icons/Quizes.jsx';
import Folder from '@/components/icons/Folder.jsx';
import styles from './Sidebar.module.scss';
import Button from '@/components/commons/Button/Button.jsx';
import { X } from 'lucide-react';

export const Sidebar = ({ isOpen, setOpen }) => {
  const link = [
    {
      name: 'Тесты',
      image: <Quizes />,
      to: staticLinks.quizzes,
    },
    {
      name: 'Мои тесты',
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

      {isOpen && (
        <Button
          variant="light"
          className={styles.closeBtn}
          onClick={() => {
            setOpen(false);
          }}
        >
          <X color="#3b82f6" />
        </Button>
      )}
    </aside>
  );
};
