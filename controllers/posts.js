import { postsService } from '../services/posts.js';

class PostsController {
  async create(req, res) {
    try {
      const data = await postsService.create({ ...req.body, userId: req.userId });
      res.status(201).json(data);
    } catch (e) {
      res.status(500).json({ message: 'Не удалось создать пост' });
    }
  }
  async delete(req, res) {
    try {
      const data = await postsService.delete(req.params.id);
      res.json(data);
    } catch (e) {
      res.status(404).json({ message: 'Не удалось удалить пост' });
    }
  }
  async update(req, res) {
    try {
      const data = await postsService.update(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      res.status(404).json({ message: 'Не удалось обновить пост' });
    }
  }
  async getPosts(req, res) {
    try {
      const data = await postsService.getPosts(req.query);
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: 'Не удалось получить список постов' });
    }
  }
  async getOnePost(req, res) {
    try {
      const data = await postsService.getOnePost(req.params.id);
      res.json(data);
    } catch (e) {
      res.status(404).json({ message: 'Пост не найден' });
    }
  }
  async getTags(req, res) {
    try {
      const data = await postsService.getTags();
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async getLastComments(req, res) {
    try {
      const data = await postsService.getLastComments();
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async addComment(req, res) {
    try {
      const data = await postsService.addComment(req.userId, req.params.id, req.body);
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async deleteComment(req, res) {
    try {
      const data = await postsService.deleteComment(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
}

export const postsController = new PostsController();
