import Button from '@/components/commons/Button/Button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import '@/assets/styles/auth.scss';
import RegistrationForm from '@/components/commons/RegistrationForm/RegistrationForm.jsx';

const RegistrationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth">
      <div className="card">
        <h1 className="title">Создать аккаунт</h1>
        <p className="subtitle">Введите данные для регистрации</p>

        <RegistrationForm />

        <p className="switch">
          Уже есть аккаунт?{' '}
          <Link className="switch__link" to="/login">
            Войти
          </Link>
        </p>

        <Button
          className="backBtn"
          color="neutral"
          variant="outline"
          onClick={() => navigate('/welcome')}
        >
          Вернуться назад
        </Button>
      </div>
    </div>
  );
};

export default RegistrationPage;
