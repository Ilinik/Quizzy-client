import Button from '@/components/commons/Button/Button.jsx';
import { useStore } from '@/hooks/useStore.js';
import { observer } from 'mobx-react-lite';
import Loader from '@/components/commons/Loader/Loader.jsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import '@/assets/styles/base.scss';
import { loginSchema } from '@/schemas/login.schema.js';
import clsx from 'clsx';

const LoginForm = observer(() => {
  const authStore = useStore().auth;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      await authStore.login(data.email, data.password);
    } catch (e) {
      console.log(e);
      setError('root', {
        message: 'Неправильный email или пароль!',
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email')}
        type="text"
        placeholder="Email"
        className="input"
      />
      {errors.email && <div className="formError">{errors.email.message}</div>}
      <input
        {...register('password')}
        type="password"
        placeholder="Пароль"
        className="input"
      />

      <Button
        disabled={isSubmitting}
        color="primary"
        type="submit"
        className="cta"
      >
        {isSubmitting ? <Loader size="sm" color /> : 'Войти'}
      </Button>

      {errors.root && <div className="formError">{errors.root.message}</div>}

      {authStore.loginError && (
        <div className={clsx('formError', 'formErrorCenter')}>
          Неправильный email или пароль!
        </div>
      )}
    </form>
  );
});

export default LoginForm;
