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

export default router;
