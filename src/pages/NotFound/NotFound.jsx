import styles from './NotFound.module.scss';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.errorCode}>404</div>

        <h1 className={styles.title}>Страница не найдена</h1>

        <p className={styles.description}>
          К сожалению, запрашиваемая страница не существует или была удалена
        </p>

        <button onClick={() => {navigate('/')}} className={styles.button}>
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default NotFound;