import {createAuthorIfRequired} from '../utils/author';
import {BlogComment} from '../models/blog-comment';
import {Router} from 'express';
import * as uuid from 'uuid';
import * as context from '../context';
import {isAuthenticated} from '../utils/middlewares';

const router = Router();

router.get('/:slug/comment', async(req, res, next) => {
  try {
    const skip = req.query.skip || 0;
    const limit = 20;

    const comments = await context
      .select(BlogComment)
      .where({
        blogSlug: req.params.slug,
      })
      .orderBy(b => b.created, 'desc')
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({
      items: comments,
      skip: skip,
      limit: limit,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/:slug/comment', isAuthenticated, async(req, res, next) => {
  try {
    await context.transaction(async(trx) => {
      await createAuthorIfRequired(trx, req.user);
      await context.insert(BlogComment)
        .value({
          id: uuid.v4(),
          blogSlug: req.params.slug,
          text: req.body.text,
          authorId: req.user.id,
          created: new Date(),
        })
        .exec();
    });

    res.status(201);
  } catch (error) {
    next(error);
  }
});

export = router;
