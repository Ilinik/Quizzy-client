import Button from '@/components/commons/Button/Button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import '@/assets/styles/auth.scss';
import LoginForm from '@/components/commons/LoginForm/LoginForm.jsx';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth">
      <div className="card">
        <h1 className="title">Войти в аккаунт</h1>
        <p className="subtitle">Введите свои данные для входа</p>

        <LoginForm />

        <p className="switch">
          Нет аккаунта?{' '}
          <Link className="switch__link" to="/registration">
            Зарегистрироваться
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

export default LoginPage;
