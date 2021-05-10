import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateLaboratoryAndExamsTable1620665141715
  implements MigrationInterface
{
  name = 'CreateLaboratoryAndExamsTable1620665141715';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "laboratories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "status" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_095d956b8c0841845525483188c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "status" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "laboratories_exams_exams" ("laboratoriesId" uuid NOT NULL, "examsId" uuid NOT NULL, CONSTRAINT "PK_b4dd5e01329f5cf06c4af149921" PRIMARY KEY ("laboratoriesId", "examsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1e793b43b133844f884175ee3e" ON "laboratories_exams_exams" ("laboratoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_33d878d433ab025c090095ab77" ON "laboratories_exams_exams" ("examsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "laboratories_exams_exams" ADD CONSTRAINT "FK_1e793b43b133844f884175ee3e0" FOREIGN KEY ("laboratoriesId") REFERENCES "laboratories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "laboratories_exams_exams" ADD CONSTRAINT "FK_33d878d433ab025c090095ab778" FOREIGN KEY ("examsId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "laboratories_exams_exams" DROP CONSTRAINT "FK_33d878d433ab025c090095ab778"`,
    );
    await queryRunner.query(
      `ALTER TABLE "laboratories_exams_exams" DROP CONSTRAINT "FK_1e793b43b133844f884175ee3e0"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_33d878d433ab025c090095ab77"`);
    await queryRunner.query(`DROP INDEX "IDX_1e793b43b133844f884175ee3e"`);
    await queryRunner.query(`DROP TABLE "laboratories_exams_exams"`);
    await queryRunner.query(`DROP TABLE "exams"`);
    await queryRunner.query(`DROP TABLE "laboratories"`);
  }
}
