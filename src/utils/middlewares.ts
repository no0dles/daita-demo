import {RequestHandler} from 'express';

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  next();
};

export const isAdministrator: RequestHandler = (req, res, next) => {
  if(!req.user) {
    return res.sendStatus(401);
  }

  if (!req.user.admin) {
    return res.sendStatus(403);
  }

  next();
};
