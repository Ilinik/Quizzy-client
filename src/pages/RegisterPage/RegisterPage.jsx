import Button from '@/components/commons/Button/Button.jsx';
import styles from './RegisterPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.auth}>
      <div className={styles.card}>
        <h1 className={styles.title}>Создать аккаунт</h1>
        <p className={styles.subtitle}>Введите данные для регистрации</p>

        <form className={styles.form}>
          <input type="text" placeholder="Имя" className={styles.input} />
          <input type="email" placeholder="Email" className={styles.input} />
          <input
            type="password"
            placeholder="Пароль"
            className={styles.input}
          />
          <Button color="primary" type="submit" className={styles.cta}>
            Зарегистрироваться
          </Button>
        </form>

        <p className={styles.switch}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
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

export default RegisterPage;
