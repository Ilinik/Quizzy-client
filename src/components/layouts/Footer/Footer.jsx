import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Quizzy. Все права защищены.</p>
    </footer>
  );
};

export default Footer;
