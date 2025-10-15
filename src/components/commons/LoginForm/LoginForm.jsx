import Button from '@/components/commons/Button/Button.jsx';
import { useState } from 'react';
import { useStore } from '@/hooks/useStore.js';

const LoginForm = () => {
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
    </form>
  );
};

export default LoginForm;
