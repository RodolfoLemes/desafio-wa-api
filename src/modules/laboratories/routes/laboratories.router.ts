import pagination from '@modules/pagination/middlewares/pagination';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import LaboratoriesController from '../controllers/LaboratoriesController';

const router = Router();

const laboratoriesController = new LaboratoriesController();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      address: Joi.string().required(),
    },
  }),
  laboratoriesController.create,
);

router.get(
  '/',
  pagination,
  celebrate({
    [Segments.QUERY]: {
      status: Joi.string().valid('true', 'false'),
      limit: Joi.number(),
      page: Joi.number(),
    },
  }),
  laboratoriesController.list,
);

router.get(
  '/:laboratory_id',
  celebrate({
    [Segments.PARAMS]: {
      laboratory_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  laboratoriesController.show,
);

router.delete(
  '/:laboratory_id',
  celebrate({
    [Segments.PARAMS]: {
      laboratory_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  laboratoriesController.remove,
);
export default router;
