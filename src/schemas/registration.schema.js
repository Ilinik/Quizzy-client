import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(4, 'Имя должно содержать минимум 4 символа!'),
  email: z.string().email('Введите корректный Email!'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов!'),
});
