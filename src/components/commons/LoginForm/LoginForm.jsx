import Button from '@/components/commons/Button/Button.jsx';
import { useState } from 'react';
import { useStore } from '@/hooks/useStore.js';
import { observer } from 'mobx-react-lite';
import Loader from '@/components/commons/Loader/Loader.jsx';

const LoginForm = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authStore = useStore().auth;
  return (
    <form className="form">
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {authStore.isLoadingAuth ? (
        <Button
          disabled
          color="primary"
          type="submit"
          className="cta"
          onClick={(e) => {
            e.preventDefault();
            authStore.login(email, password);
          }}
        >
          <Loader size="sm" color />
        </Button>
      ) : (
        <Button
          color="primary"
          type="submit"
          className="cta"
          onClick={(e) => {
            e.preventDefault();
            authStore.login(email, password);
          }}
        >
          Войти
        </Button>
      )}
    </form>
  );
});

export default LoginForm;
