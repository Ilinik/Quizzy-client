import Button from '@/components/commons/Button/Button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import '@/assets/styles/auth.scss';

const RegistrationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth">
      <div className="card">
        <h1 className="title">Создать аккаунт</h1>
        <p className="subtitle">Введите данные для регистрации</p>

        <form className="form">
          <input type="text" placeholder="Имя" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Пароль" className="input" />

          <Button
            color="primary"
            type="submit"
            className="cta"
            onClick={(e) => e.preventDefault()}
          >
            Зарегистрироваться
          </Button>
        </form>

        <p className="switch">
          Уже есть аккаунт?{' '}
          <Link className="switch__link" to="/login">
            Войти
          </Link>
        </p>

        <Button
          className="backBtn"
          color="neutral"
          outline
          onClick={() => navigate('/welcome')}
        >
          Вернуться назад
        </Button>
      </div>
    </div>
  );
};

export default RegistrationPage;
