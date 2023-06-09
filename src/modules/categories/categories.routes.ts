import { Category } from '@prisma/client';
import * as express from 'express';
import { APIResponse } from '../../common';
import CategoryService from './categories.service';
import { AuthGuard } from '../auth/middlewares';

const categoriesRouter = express.Router();

export default (app: express.Router) => {
  app.use('/categories', categoriesRouter);
  categoriesRouter.use(AuthGuard());

  categoriesRouter.post(
    '/',
    async (req, res, next) => {
      try {
        const category: Category = await CategoryService.create(req.body);
        res.status(200).json(new APIResponse({
          success: true,
          message: 'category created.',
          code: 200,
          data: category,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  categoriesRouter.patch(
    '/:id',
    async (req, res, next) => {
      try {
        const category: Category = await CategoryService.update(
          Number(req.params.id),
          req.body,
        );
        res.status(200).json(new APIResponse({
          success: true,
          message: 'category updated.',
          code: 200,
          data: category,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  categoriesRouter.get(
    '/:id',
    async (req, res, next) => {
      try {
        const category: Category = await CategoryService.getById(Number(req.params.id));
        res.status(200).json(new APIResponse({
          success: true,
          message: 'category fetched.',
          code: 200,
          data: category,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  categoriesRouter.get(
    '/',
    async (req, res, next) => {
      try {
        const categories: Category[] = await CategoryService.getByUserID(req.body.userId);
        res.status(200).json(new APIResponse({
          success: true,
          message: 'categories fetched.',
          code: 200,
          data: categories,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  categoriesRouter.delete(
    '/:id',
    async (req, res, next) => {
      try {
        await CategoryService.delete(Number(req.params.id));
        res.status(200).json(new APIResponse({
          success: true,
          message: 'category deleted.',
          code: 200,
        }));
      } catch (error) {
        next(error);
      }
    },
  );
};
