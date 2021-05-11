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

export default router;
