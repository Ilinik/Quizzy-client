import styles from './SidebarLink.module.css';

export const SidebarLink = ({ name, image }) => {
  return (
    <button className={styles.button}>
      <img src={image} alt="Image" className={styles.image} />
      {name}
    </button>
  );
};
