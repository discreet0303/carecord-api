import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOptionColumn1686735293326 implements MigrationInterface {
  name = 'UpdateOptionColumn1686735293326';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contact-book-option" DROP COLUMN "option"`);
    await queryRunner.query(`ALTER TABLE "contact-book-option" ADD "options" json NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contact-book-option" DROP COLUMN "options"`);
    await queryRunner.query(`ALTER TABLE "contact-book-option" ADD "option" text NOT NULL`);
  }
}
