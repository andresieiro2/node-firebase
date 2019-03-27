import express from 'express';
import Joi from './../middlewares/joi';
import * as schemas from './../schemas/user';
// import { tokenAuth, basicAuth } from './../middlewares/auth';
import { createUserSchema } from './../schemas/user';
import userController from './../controllers/user';
import * as UserModel from './../models/user';
import scopes from './../middlewares/scope';

const userRoutes = () => {
  const router = express.Router();

  router.get(
    '/',
    // tokenAuth,
    // scopes('user:create'),
    // CheckUserTypesSchema,
    async (req, res) => {
      try {
        const user = await userController.get_user(req);
        res.status(200).send(user);
      } catch (e) {
        res.status(e.code || 400).send(e);
      }
    }
  );

  router.post(
    '/',
    // tokenAuth,
    // scopes('user:create'),
    Joi.joiValidate(createUserSchema),
    async (req, res) => {
      try {
        const user = await userController.post_user(req);
        res.status(200).send(user);
      } catch (e) {
        res.status(e.code || 400).send(e);
      }
    }
  );

  router.put(
    '/:uid',
    // tokenAuth,
    // scopes('user:update'),
    // Joi.joiValidate(schemas.user_update),
    async (req, res) => {
      try {
        const user = await userController.put_user(req);
        res.status(200).send(user);
      } catch (e) {
        res.status(e.code || 400).send(e);
      }
    }
  );

  return router;
};

export default userRoutes;
