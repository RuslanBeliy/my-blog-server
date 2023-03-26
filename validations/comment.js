import { body } from 'express-validator';

export const commentValidation = [body('text', 'Введите текст комментария').isLength({ min: 1 })];
