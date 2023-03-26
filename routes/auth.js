import { Router } from 'express';
import { authController } from '../controllers/auth.js';
import { registerValidation } from '../validations/auth.js';
import { checkValidationResult } from '../utils/checkValidationResult.js';
import { checkAuthorization } from '../utils/checkAuthorization.js';

export const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', registerValidation, checkValidationResult, authController.register);
authRouter.get('/me', checkAuthorization, authController.me);
authRouter.delete('/users', checkAuthorization, authController.deleteUser);
