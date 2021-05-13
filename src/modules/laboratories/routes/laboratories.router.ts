import pagination from '@modules/pagination/middlewares/pagination';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import LaboratoriesController from '../controllers/LaboratoriesController';

const router = Router();

const laboratoriesController = new LaboratoriesController();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.alternatives(
      Joi.array().items({
        name: Joi.string().required(),
        address: Joi.string().required(),
      }),
      {
        name: Joi.string().required(),
        address: Joi.string().required(),
      },
    ).required(),
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

router.delete(
  '/',
  celebrate({
    [Segments.BODY]: Joi.array()
      .items({
        laboratory_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      })
      .required(),
  }),
  laboratoriesController.batchRemove,
);

router.put(
  '/',
  celebrate({
    [Segments.BODY]: Joi.array()
      .items({
        laboratory_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
        name: Joi.string().required(),
        address: Joi.string().required(),
        status: Joi.boolean().required(),
      })
      .required(),
  }),
  laboratoriesController.batchUpdate,
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

router.put(
  '/:laboratory_id',
  celebrate({
    [Segments.PARAMS]: {
      laboratory_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      address: Joi.string().required(),
      status: Joi.boolean().required(),
    },
  }),
  laboratoriesController.update,
);

router.post(
  '/:laboratory_id/exam/:exam_id',
  celebrate({
    [Segments.PARAMS]: {
      laboratory_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      exam_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  laboratoriesController.associate,
);

router.delete(
  '/:laboratory_id/exam/:exam_id',
  celebrate({
    [Segments.PARAMS]: {
      laboratory_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      exam_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  laboratoriesController.disassociate,
);

export default router;
