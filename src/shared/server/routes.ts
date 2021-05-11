import { Router } from 'express';
import laboratoriesRouter from '@modules/laboratories/routes/laboratories.router';
import examsRouter from '@modules/exams/routes/exams.router';

const routes = Router();

routes.use('/laboratories', laboratoriesRouter);
routes.use('/exams', examsRouter);

export default routes;
