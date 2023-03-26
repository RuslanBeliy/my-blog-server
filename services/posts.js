import { PostModel } from '../models/post.js';

class PostsService {
  async create({ title, text, tags, imageUrl, userId }) {
    const post = new PostModel({ title, text, tags, imageUrl, author: userId });
    await post.save();
    return post;
  }

  async delete(id) {
    const post = await PostModel.findByIdAndDelete(id);

    if (!post) {
      throw new Error();
    }

    return post;
  }

  async update(id, { title, text, imageUrl, tags }) {
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { $set: { title, text, imageUrl, tags } },
      { returnDocument: 'after' }
    ).populate('author');

    if (!post) {
      throw new Error();
    }

    return post;
  }

  async getPosts({ rating, tag, skip }) {
    if (rating === 'desc' && tag) {
      const posts = await PostModel.find({ tags: { $in: [tag] } })
        .limit(10)
        .skip(skip)
        .sort({ viewsCount: -1 })
        .populate(['author', { path: 'comments', populate: { path: 'author' } }]);
      const countDocuments = posts.length;
      return { countDocuments, posts };
    }

    if (rating === 'desc') {
      const posts = await PostModel.find()
        .limit(10)
        .skip(skip)
        .sort({ viewsCount: -1 })
        .populate(['author', { path: 'comments', populate: { path: 'author' } }]);
      const countDocuments = await PostModel.countDocuments();
      return { countDocuments, posts };
    }

    if (tag) {
      const posts = await PostModel.find({ tags: { $in: [tag] } })
        .limit(10)
        .skip(skip)
        .populate(['author', { path: 'comments', populate: { path: 'author' } }]);
      const countDocuments = posts.length;
      return { countDocuments, posts };
    }

    const posts = await PostModel.find()
      .limit(10)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate(['author', { path: 'comments', populate: { path: 'author' } }]);
    const countDocuments = await PostModel.countDocuments();
    return { countDocuments, posts };
  }

  async getOnePost(id) {
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    ).populate(['author', { path: 'comments', populate: { path: 'author' } }]);

    if (!post) {
      throw new Error();
    }

    return post;
  }
  async getTags() {
    const posts = await PostModel.find({}, { tags: 1 });
    const tags = posts.map((post) => post.tags).flat();

    const countTags = tags.reduce((acc, tag) => {
      const fined = acc.find((el) => el.name === tag);
      if (fined) {
        fined.count += 1;
        return acc;
      }
      return (acc = [...acc, { count: 1, name: tag }]);
    }, []);

    countTags.sort((a, b) => a.count - b.count);
    const filteredTags = countTags.map((tag) => tag.name).slice(0, 10);

    return filteredTags;
  }
  async getLastComments() {
    const posts = await PostModel.find({}, { comments: 1 })
      .limit()
      .populate({
        path: 'comments',
        populate: { path: 'author' },
      });
    const comments = posts.map((post) => post.comments).flat();

    return comments.slice(-5);
  }

  async addComment(userId, postId, { text }) {
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: { text, postId, author: userId } } },
      { returnDocument: 'after' }
    ).populate(['author', { path: 'comments', populate: 'author' }]);
    return post;
  }
  async deleteComment(postId, { commentId }) {
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: { _id: commentId } } },
      { returnDocument: 'after' }
    ).populate(['author', { path: 'comments', populate: 'author' }]);
    return post;
  }
}

export const postsService = new PostsService();
