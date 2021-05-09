import { v4 as uuidv4 } from 'uuid';
import Exam from '../../entities/Exam';
import IExamsRepository from '../IExamsRepository';
import ICreateExamDTO from '../../dtos/ICreateExamDTO';

class FakeExamsRepository implements IExamsRepository {
  private exams: Exam[] = [];

  public async create(data: ICreateExamDTO): Promise<Exam> {
    const exam = new Exam();

    Object.assign(exam, { ...data, id: uuidv4(), status: false });

    this.exams.push(exam);

    return exam;
  }

  public async save(exam: Exam): Promise<Exam> {
    const index = this.exams.findIndex(findExam => findExam.id === exam.id);

    this.exams[index] = exam;

    return exam;
  }

  public async findById(examId: string): Promise<Exam | undefined> {
    return this.exams.find(exam => exam.id === examId);
  }
}

export default FakeExamsRepository;
