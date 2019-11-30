import {createAuthorIfRequired} from '../utils/author';
import {isAdministrator} from '../utils/middlewares';
import {BlogPost} from '../models/blog-post';
import {Router} from 'express';
import * as context from '../context';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const skip = req.query.skip || 0;
    const limit = 20;

    const blogPosts = await context
      .select(BlogPost)
      .orderBy(b => b.created, 'desc')
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({
      items: blogPosts,
      skip: skip,
      limit: limit,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', isAdministrator, async (req, res, next) => {
  try {
    await context.transaction(async (trx) => {
      await createAuthorIfRequired(trx, req.user);

      await trx
        .insert(BlogPost)
        .value({
          content: req.body.content,
          created: new Date(),
          authorId: req.user.id,
          slug: req.body.slug,
          title: req.body.title,
        })
        .exec();
    });

    res.status(201);
  } catch (error) {
    next(error);
  }
});

router.put('/:slug', isAdministrator, async (req, res, next) => {
  try {
    const result = await context.update(BlogPost)
      .set({
        title: req.body.title,
        content: req.body.content,
      })
      .where({
        slug: req.params.slug,
        authorId: req.user.id,
      });

    if (result.affectedRows === 0) {
      res.status(404);
    } else {
      res.status(201);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:slug', isAdministrator, async (req, res, next) => {
  try {
    const result = await context
      .delete(BlogPost)
      .where({
        slug: req.params.slug,
      })
      .exec();
    if (result.affectedRows === 0) {
      res.status(404);
    } else {
      res.status(200);
    }
  } catch (error) {
    next(error);
  }
});

export = router;
