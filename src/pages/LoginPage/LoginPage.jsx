import Button from '@/components/commons/Button/Button.jsx';
import styles from './LoginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.auth}>
      <div className={styles.card}>
        <h1 className={styles.title}>Войти в аккаунт</h1>
        <p className={styles.subtitle}>Введите свои данные для входа</p>

        <form className={styles.form}>
          <input type="email" placeholder="Email" className={styles.input} />
          <input
            type="password"
            placeholder="Пароль"
            className={styles.input}
          />
          <Button color="primary" type="submit" className={styles.cta}>
            Войти
          </Button>
        </form>

        <p className={styles.switch}>
          Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
        </p>

        <Button
          className={styles.backBtn}
          color="neutral"
          outline
          onClick={() => navigate('/welcome')}
        >
          Назад
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
