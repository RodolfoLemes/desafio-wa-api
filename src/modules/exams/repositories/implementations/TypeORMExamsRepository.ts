import { Repository, getRepository } from 'typeorm';
import Exam from '../../entities/Exam';
import ICreateExamDTO from '../../dtos/ICreateExamDTO';
import IExamsRepository from '../IExamsRepository';

class TypeORMExamsRepository implements IExamsRepository {
  private ormRepository: Repository<Exam>;

  constructor() {
    this.ormRepository = getRepository(Exam);
  }

  public async create(data: ICreateExamDTO): Promise<Exam> {
    const exam = this.ormRepository.create({
      ...data,
    });

    await this.ormRepository.save(exam);

    return exam;
  }

  public async save(exam: Exam): Promise<Exam> {
    return this.ormRepository.save(exam);
  }

  public async findById(examId: string): Promise<Exam | undefined> {
    const exam = this.ormRepository.findOne({ where: { id: examId } });

    return exam;
  }
}

export default TypeORMExamsRepository;
