import { Router } from 'express';
import { postsController } from '../controllers/posts.js';
import { postValidation } from '../validations/post.js';
import { checkValidationResult } from '../utils/checkValidationResult.js';
import { checkAuthorization } from '../utils/checkAuthorization.js';
import { commentValidation } from '../validations/comment.js';

export const postsRouter = Router();

postsRouter.get('/', postsController.getPosts);
postsRouter.get('/tags', postsController.getTags);
postsRouter.get('/comments', postsController.getLastComments);
postsRouter.get('/:id', postsController.getOnePost);
postsRouter.post(
  '/comments/:id',
  checkAuthorization,
  commentValidation,
  checkValidationResult,
  postsController.addComment
);
postsRouter.post(
  '/',
  checkAuthorization,
  postValidation,
  checkValidationResult,
  postsController.create
);
postsRouter.delete('/:id', checkAuthorization, postsController.delete);
postsRouter.put('/comments/:id', checkAuthorization, postsController.deleteComment);
postsRouter.put(
  '/:id',
  checkAuthorization,
  postValidation,
  checkValidationResult,
  postsController.update
);
