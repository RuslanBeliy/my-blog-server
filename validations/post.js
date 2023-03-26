import { body } from 'express-validator';

export const postValidation = [
  body('title', 'Длина заголовка должна содержать минимум 3 символа').isLength({ min: 3 }),
  body('text', 'Длина публикуемого текста должна быть минимум 10 символов').isLength({ min: 10 }),
  body('tags', 'Формат тэгов неверный').isArray().optional(),
  body('imageUrl', 'Неверный формат картинки').optional(),
];
