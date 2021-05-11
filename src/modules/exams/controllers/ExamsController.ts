import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateExamsService from '../services/CreateExamsService';
import ListExamsService from '../services/ListExamsService';

export default class ExamsController {
  async create(req: Request, res: Response): Promise<Response> {
    if (!Array.isArray(req.body)) req.body = [req.body];

    const createExams = container.resolve(CreateExamsService);

    const laboratories = await createExams.execute(req.body);

    return res.status(201).json(classToClass(laboratories));
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { status, type } = req.query;
    const { paginationOptions } = req;

    const filteredStatus = status !== undefined ? status === 'true' : true;
    const filteredType = type
      ? (type as 'analise clinica' | 'imagem')
      : undefined;

    const listExams = container.resolve(ListExamsService);
    const data = await listExams.execute({
      status: filteredStatus,
      type: filteredType,
      paginationOptions,
    });

    return res.json(classToClass(data));
  }
}
