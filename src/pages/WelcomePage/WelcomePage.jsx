import { Header } from '@/components/commons/Header/Header.jsx';
import Button from '@/components/commons/Button/Button.jsx';
import styles from './WelcomePage.module.scss';

const WelcomePage = () => {
  return (
    <div className={styles.welcome}>
      <Header />
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Присоединяйтесь к платформе квизов и прокачайте свои знания
          </h1>
          <p className={styles.subtitle}>
            Проходите интересные тесты, создавайте собственные викторины и
            соревнуйтесь с друзьями в реальном времени.
          </p>
          <Button color="primary" className={styles.cta}>
            Присоединиться
          </Button>
        </div>

        <div className={styles.illustration} />
      </section>
    </div>
  );
};

export default WelcomePage;
