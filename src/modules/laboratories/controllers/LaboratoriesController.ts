import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateLaboratoryService from '../services/CreateLaboratoryService';

export default class LaboratoriesController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, address } = req.body;

    const createLaboratory = container.resolve(CreateLaboratoryService);
    const laboratory = await createLaboratory.execute({
      name,
      address,
    });

    return res.status(201).json(classToClass(laboratory));
  }
}
