import {Router} from 'express';
import {Author} from '../models/author';
import {BlogComment} from '../models/blog-comment';
import {BlogPost} from '../models/blog-post';
import * as context from '../context';
import {isAuthenticated} from '../utils/middlewares';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const skip = req.query.skip || 0;
    const limit = 20;

    const authors = await context
      .select(Author)
      .skip(skip)
      .limit(limit)
      .orderBy(a => a.firstName, 'asc')
      .exec();

    res.status(200).json({
      items: authors,
      skip: skip,
      limit: limit,
    });
  } catch (e) {
    next(e);
  }
});

router.put('/:id', isAuthenticated, async (req, res, next) => {
  try {
    if (!req.user || req.user.id !== req.params.id) {
      return res.status(403);
    }

    const result = await context
      .update(Author)
      .set({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        biography: req.body.biography,
      })
      .where({
        id: req.user.id,
      })
      .exec();

    if (result.affectedRows === 0) {
      await context.insert(Author)
        .value({
          id: req.user.id,
          username: req.user.username,
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          biography: req.body.biography,
        })
        .exec();
    } else {
      res.status(201);
    }
  } catch (e) {
    next(e);
  }
});

router.get('/:id/blog', async (req, res, next) => {
  try {
    const skip = req.query.skip || 0;
    const limit = 20;

    const blogs = await context
      .select(BlogPost)
      .where({
        authorId: req.params.id,
      })
      .skip(skip)
      .limit(limit)
      .orderBy(a => a.created, 'desc')
      .exec();

    res.status(200).json({
      items: blogs,
      skip: skip,
      limit: limit,
    });
  } catch (e) {
    next(e);
  }
});

router.get('/:id/comment', async (req, res, next) => {
  try {
    const skip = req.query.skip || 0;
    const limit = 20;

    const comments = await context
      .select(BlogComment)
      .where({
        authorId: req.params.id,
      })
      .skip(skip)
      .limit(limit)
      .orderBy(a => a.created, 'desc')
      .exec();

    res.status(200).json({
      items: comments,
      skip: skip,
      limit: limit,
    });
  } catch (e) {
    next(e);
  }
});

export = router;
