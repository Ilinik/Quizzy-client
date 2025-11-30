import { Header } from '@/components/layouts/Header/Header.jsx';
import Button from '@/components/commons/Button/Button.jsx';
import styles from './WelcomePage.module.scss';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.welcome}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Прокачайте свои знания с интерактивными тестами
          </h1>

          <p className={styles.subtitle}>
            Создавайте свои викторины, проходите тематические тесты и
            соревнуйтесь с друзьями в реальном времени.
          </p>

          <Button
            color="primary"
            className={styles.cta}
            onClick={() => navigate('/registration')}
          >
            Присоединиться
          </Button>
        </div>

        <div className={styles.illustration} />
      </section>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Quizzy. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
