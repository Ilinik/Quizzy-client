import { SidebarLink } from '../SidebarLink/SidebarLink';

export const Sidebar = () => {
  const link = [
    { name: 'Главная', image: '/sidebar/home.svg' },
    { name: 'Квизы', image: '/sidebar/home.svg' },
  ];

  return (
    <aside>
      <nav>
        {link.map((item) => (
          <SidebarLink key={item.name} name={item.name} image={item.image} />
        ))}
      </nav>
    </aside>
  );
};
