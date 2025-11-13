import Button from '@/components/commons/Button/Button.jsx';
import { useStore } from '@/hooks/useStore.js';
import '@/assets/styles/base.scss';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loader from '@/components/commons/Loader/Loader.jsx';

const RegistrationForm = () => {
  const authStore = useStore().auth;

  const schema = z.object({
    name: z.string().min(4, 'Имя должно содержать минимум 4 символа!'),
    email: z.string().email('Некорректный Email!'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      await authStore.registration(data.name, data.email, data.password);
    } catch (e) {
      console.log(e);
      setError('root', {
        message: 'Ошибка регистрации!',
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name')}
        type="text"
        placeholder="Имя"
        className="input"
      />
      {errors.name && <div className="formError">{errors.name.message}</div>}
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
      {errors.password && (
        <div className="formError">{errors.password.message}</div>
      )}

      <Button
        disabled={isSubmitting}
        color="primary"
        type="submit"
        className="cta"
      >
        {isSubmitting ? <Loader size="sm" color /> : 'Зарегистрироваться'}
      </Button>

      {errors.root && <div className="formError">{errors.root.message}</div>}
    </form>
  );
};

export default RegistrationForm;
