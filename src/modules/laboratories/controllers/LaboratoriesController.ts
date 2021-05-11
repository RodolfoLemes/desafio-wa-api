import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateLaboratoryService from '../services/CreateLaboratoryService';
import ListLaboratoriesServices from '../services/ListLaboratoriesServices';
import RemoveLaboratoryService from '../services/RemoveLaboratoryService';
import ShowLaboratoryService from '../services/ShowLaboratoryService';

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

  async list(req: Request, res: Response): Promise<Response> {
    const { paginationOptions } = req;
    const { status } = req.query;

    const filteredStatus = status !== undefined ? status === 'true' : true;

    const listLaboratories = container.resolve(ListLaboratoriesServices);
    const data = await listLaboratories.execute({
      status: filteredStatus,
      paginationOptions,
    });

    return res.json(classToClass(data));
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { laboratory_id: laboratoryId } = req.params;

    const showLaboratory = container.resolve(ShowLaboratoryService);
    const laboratory = await showLaboratory.execute({
      laboratoryId,
    });

    return res.json(classToClass(laboratory));
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { laboratory_id: laboratoryId } = req.params;

    const removedLaboratory = container.resolve(RemoveLaboratoryService);
    await removedLaboratory.execute({
      laboratoryId,
    });

    return res.status(204).send();
  }
}
