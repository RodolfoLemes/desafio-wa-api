import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateExamsService from '../services/CreateExamsService';

export default class ExamsController {
  async create(req: Request, res: Response): Promise<Response> {
    if (!Array.isArray(req.body)) req.body = [req.body];

    const createExams = container.resolve(CreateExamsService);

    const laboratories = await createExams.execute(req.body);

    return res.status(201).json(classToClass(laboratories));
  }
}
