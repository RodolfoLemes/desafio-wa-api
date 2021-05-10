import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Laboratory from '../entities/Laboratory';
import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

interface IRequest {
  name: string;
  address: string;
}

@injectable()
export default class CreateLaboratoryService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,
  ) {}

  public async execute({ name, address }: IRequest): Promise<Laboratory> {
    if (await this.laboratoriesRepository.findByName(name))
      throw new AppError('Laboratory with the same name is not allowed');

    const laboratory = await this.laboratoriesRepository.create({
      name,
      address,
    });

    return laboratory;
  }
}
