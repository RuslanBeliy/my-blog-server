import { authService } from '../services/auth.js';

class AuthController {
  async login(req, res) {
    try {
      const data = await authService.login(req.body);
      res.json(data);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  async register(req, res) {
    try {
      const data = await authService.register(req.body);
      res.json(data);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  async deleteUser(req, res) {
    try {
      const data = await authService.deleteUser(req.userId);
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: 'Не удалось удалить аккаунт' });
    }
  }
  async me(req, res) {
    try {
      const data = await authService.me(req.userId);
      res.json(data);
    } catch (e) {
      res.status(403).json({ message: e.message });
    }
  }
}

export const authController = new AuthController();
