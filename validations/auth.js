import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Введите корректный E-mail').isEmail(),
  body('password', 'Пароль должен содержать минимум 5 символов').isLength({ min: 5 }),
  body('userName', 'Имя должно содержать минимум 3 символа').isLength({ min: 3 }),
  body('avatarUrl', 'Не верный формат картинки').optional(),
];
