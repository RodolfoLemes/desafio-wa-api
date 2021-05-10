import { Repository, getRepository } from 'typeorm';
import Laboratory from '../../entities/Laboratory';
import ICreateLaboratoryDTO from '../../dtos/ICreateLaboratoryDTO';
import ILaboratoriesRepository from '../ILaboratoriesRepository';

class TypeORMLaboratoriesRepository implements ILaboratoriesRepository {
  private ormRepository: Repository<Laboratory>;

  constructor() {
    this.ormRepository = getRepository(Laboratory);
  }

  public async create(data: ICreateLaboratoryDTO): Promise<Laboratory> {
    const laboratory = this.ormRepository.create({
      ...data,
    });

    await this.ormRepository.save(laboratory);

    return laboratory;
  }

  public async save(laboratory: Laboratory): Promise<Laboratory> {
    return this.ormRepository.save(laboratory);
  }

  public async findById(laboratoryId: string): Promise<Laboratory | undefined> {
    const laboratory = this.ormRepository.findOne({
      where: { id: laboratoryId },
    });

    return laboratory;
  }

  public async findByName(name: string): Promise<Laboratory | undefined> {
    const laboratory = this.ormRepository.findOne({
      where: { name },
    });

    return laboratory;
  }
}

export default TypeORMLaboratoriesRepository;
