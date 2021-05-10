import { Router } from 'express';
import laboratoriesRouter from '@modules/laboratories/routes/laboratories.router';

const routes = Router();

routes.use('/laboratories', laboratoriesRouter);

export default routes;
