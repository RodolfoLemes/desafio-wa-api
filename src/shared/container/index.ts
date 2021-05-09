import { container } from 'tsyringe';

import './providers';

import ILaboratoriesRepository from '@modules/laboratories/repositories/ILaboratoriesRepository';
import TypeORMLaboratoriesRepository from '@modules/laboratories/repositories/implementations/TypeORMLaboratoriesRepository';

import IExamsRepository from '@modules/exams/repositories/IExamsRepository';
import TypeORMExamsRepository from '@modules/exams/repositories/implementations/TypeORMExamsRepository';

container.registerSingleton<ILaboratoriesRepository>(
  'LaboratoriesRepository',
  TypeORMLaboratoriesRepository,
);

container.registerSingleton<IExamsRepository>(
  'ExamsRepository',
  TypeORMExamsRepository,
);
