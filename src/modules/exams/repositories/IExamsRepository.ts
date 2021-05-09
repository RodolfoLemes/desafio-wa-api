import Exam from '../entities/Exam';
import ICreateExamDTO from '../dtos/ICreateExamDTO';

export default interface IExamsRepository {
  create(data: ICreateExamDTO): Promise<Exam>;
  save(exam: Exam): Promise<Exam>;
  findById(examId: string): Promise<Exam | undefined>;
}
