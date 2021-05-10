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

  public async findById(laboratoryId: string): Promise<Laboratory | undefined> {
    return this.laboratories.find(laboratory => laboratory.id === laboratoryId);
  }

  public async findByName(name: string): Promise<Laboratory | undefined> {
    return this.laboratories.find(laboratory => laboratory.name === name);
  }
}

export default FakeLaboratoriesRepository;
