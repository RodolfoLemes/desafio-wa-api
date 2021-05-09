import Laboratory from '../entities/Laboratory';
import ICreateLaboratoryDTO from '../dtos/ICreateLaboratoryDTO';

export default interface ILaboratoriesRepository {
  create(data: ICreateLaboratoryDTO): Promise<Laboratory>;
  save(laboratory: Laboratory): Promise<Laboratory>;
  findById(laboratoryId: string): Promise<Laboratory | undefined>;
}
