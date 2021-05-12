import pagination from '@modules/pagination/middlewares/pagination';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ExamsController from '../controllers/ExamsController';

const router = Router();
const examsController = new ExamsController();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.alternatives(
      Joi.array().items({
        name: Joi.string().required(),
        type: Joi.string().valid('analise clinica', 'imagem').required(),
      }),
      {
        name: Joi.string().required(),
        type: Joi.string().valid('analise clinica', 'imagem').required(),
      },
    ).required(),
  }),
  examsController.create,
);

router.get(
  '/',
  pagination,
  celebrate({
    [Segments.QUERY]: {
      status: Joi.string().valid('true', 'false'),
      type: Joi.string().valid('analise clinica', 'imagem'),
      limit: Joi.number(),
      page: Joi.number(),
    },
  }),
  examsController.list,
);

router.delete(
  '/:exam_id',
  celebrate({
    [Segments.PARAMS]: {
      exam_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  examsController.remove,
);

export default router;
