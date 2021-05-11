import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import Pagination from '@modules/pagination';
import Laboratory from '../entities/Laboratory';
import ICreateLaboratoryDTO from '../dtos/ICreateLaboratoryDTO';

export default interface ILaboratoriesRepository {
  create(data: ICreateLaboratoryDTO): Promise<Laboratory>;
  save(laboratory: Laboratory): Promise<Laboratory>;
  findById(laboratoryId: string): Promise<Laboratory | undefined>;
  findByName(name: string): Promise<Laboratory | undefined>;
  findAllByStatus(
    status: boolean,
    paginationOptions: IPaginationOptions,
  ): Promise<Pagination<Laboratory>>;
}
