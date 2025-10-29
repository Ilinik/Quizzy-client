import { WhiteTile } from '../../components/commons/WhiteTile/WhiteTile';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <WhiteTile>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Главная страница</h1>
        <p className={styles.subtitle}>
          Следите за прогрессом, улучшайте результаты и проходите новые квизы
        </p>
      </div>
    </WhiteTile>
  );
};

export default HomePage;
