import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import Pagination from '@modules/pagination';
import { v4 as uuidv4 } from 'uuid';
import Laboratory from '../../entities/Laboratory';
import ILaboratoriesRepository from '../ILaboratoriesRepository';
import ICreateLaboratoryDTO from '../../dtos/ICreateLaboratoryDTO';

class FakeLaboratoriesRepository implements ILaboratoriesRepository {
  private laboratories: Laboratory[] = [];

  public async create(data: ICreateLaboratoryDTO): Promise<Laboratory> {
    const laboratory = new Laboratory();

    Object.assign(laboratory, { ...data, id: uuidv4(), status: false });

    this.laboratories.push(laboratory);

    return laboratory;
  }

  public async save(laboratory: Laboratory): Promise<Laboratory> {
    const index = this.laboratories.findIndex(
      findLaboratory => findLaboratory.id === laboratory.id,
    );

    this.laboratories[index] = laboratory;

    return laboratory;
  }

  public async remove(laboratory: Laboratory): Promise<Laboratory> {
    const index = this.laboratories.findIndex(
      findLaboratory => findLaboratory.id === laboratory.id,
    );

    this.laboratories.splice(index, 1);

    return laboratory;
  }

  public async findById(laboratoryId: string): Promise<Laboratory | undefined> {
    return this.laboratories.find(laboratory => laboratory.id === laboratoryId);
  }

  public async findByName(name: string): Promise<Laboratory | undefined> {
    return this.laboratories.find(laboratory => laboratory.name === name);
  }

  public async findAllByStatus(
    status: boolean,
    { limit, page }: IPaginationOptions,
  ): Promise<Pagination<Laboratory>> {
    const foundLaboratories = this.laboratories.filter(
      findWithdraw => findWithdraw.status === status,
    );

    const total = foundLaboratories.length;

    return {
      values: foundLaboratories.slice((page - 1) * limit, page * limit),
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export default FakeLaboratoriesRepository;
