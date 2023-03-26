import { UserModel } from '../models/user.js';
import { PostModel } from '../models/post.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

class AuthService {
  async login({ email, password }) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('Неверный логин или пароль');
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      throw new Error('Неверный логин или пароль');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    const { password: pass, ...userData } = user._doc;
    return { message: 'Вы вошли в свой аккаунт', token, userData };
  }

  async register({ email, password, userName, avatarUrl }) {
    const isExist = await UserModel.findOne({ email });

    if (isExist) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new UserModel({
      userName,
      email,
      password: hash,
      avatarUrl,
    });
    await user.save();

    const token = jwt.sign({ id: user._doc._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    const { password: pass, ...userData } = user._doc;
    return { message: 'Регистрация прошла успешно', token, userData };
  }
  async deleteUser(id) {
    const user = await UserModel.findOneAndDelete({ _id: id });

    return { message: 'Аккаунт удалён' };
  }

  async me(id) {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw new Error('Вы не авторизованы');
    }

    const { password: pass, ...userData } = user._doc;
    return { message: 'Вы авторизованы', token: '', userData };
  }
}

export const authService = new AuthService();
